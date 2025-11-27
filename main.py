import sys
import json
import webbrowser
import requests
import subprocess
import os
from PyQt6.QtWidgets import (QApplication, QMainWindow, QWidget, QVBoxLayout, 
                             QHBoxLayout, QLabel, QLineEdit, QPushButton, 
                             QStackedWidget, QListWidget, QListWidgetItem,
                             QMessageBox, QFrame, QScrollArea, QGridLayout)
from PyQt6.QtCore import Qt, QThread, pyqtSignal, QTimer
from PyQt6.QtGui import QFont, QPixmap, QPalette, QColor

class APIClient:
    """Handle API requests to the backend"""
    def __init__(self, base_url="http://localhost:3000"):
        self.base_url = base_url
        self.token = None
        self.user_data = None
    
    def test_connection(self):
        """Test if the backend server is reachable"""
        try:
            response = requests.get(f"{self.base_url}/", timeout=5)
            return True, f"Server reachable (Status: {response.status_code})"
        except requests.RequestException as e:
            return False, f"Server unreachable: {str(e)}"
    
    def login(self, email, password):
        """Login user and store token"""
        try:
            response = requests.post(f"{self.base_url}/auth/login", 
                                   json={"email": email, "password": password})
            if response.status_code == 200:
                data = response.json()
                self.token = data.get("token")
                # Try different possible keys for user data
                self.user_data = data.get("admin") or data.get("user") or data.get("data") or {}
                if not self.user_data:
                    # If no nested user object, use the data itself
                    self.user_data = {"name": data.get("name", "User"), "email": email}
                return True, "Login successful"
            else:
                try:
                    error_data = response.json()
                    return False, error_data.get("error", error_data.get("message", "Login failed"))
                except:
                    return False, f"Login failed with status {response.status_code}"
        except requests.RequestException as e:
            return False, f"Connection error: {str(e)}"
    
    def register(self, name, email, password):
        """Register new user"""
        try:
            response = requests.post(f"{self.base_url}/auth/signup",
                                   json={"name": name, "email": email, "password": password})
            if response.status_code == 200 or response.status_code == 201:
                data = response.json()
                self.token = data.get("token")
                return True, "Registration successful"
            else:
                try:
                    error_data = response.json()
                    return False, error_data.get("message", error_data.get("error", "Registration failed"))
                except:
                    return False, f"Registration failed with status {response.status_code}"
        except requests.RequestException as e:
            return False, f"Connection error: {str(e)}"
    
    def get_active_tests(self):
        """Get all active tests"""
        try:
            headers = {}
            if self.token:
                headers['Authorization'] = f'Bearer {self.token}'
            
            response = requests.get(f"{self.base_url}/api/tests/activeTests", headers=headers)
            
            if response.status_code == 200:
                data = response.json()
                return True, data
            elif response.status_code == 401:
                return False, "Authentication required. Please login again."
            else:
                try:
                    error_data = response.json()
                    return False, error_data.get('message', f'HTTP {response.status_code}: Failed to fetch tests')
                except:
                    error_text = response.text
                    return False, f"HTTP {response.status_code}: Failed to fetch tests - {error_text[:100]}"
        except requests.RequestException as e:
            return False, f"Connection error: {str(e)}"

class TestCard(QFrame):
    """Custom widget for displaying test information"""
    def __init__(self, test_data):
        super().__init__()
        self.test_data = test_data
        self.init_ui()
    
    def init_ui(self):
        self.setFrameStyle(QFrame.Shape.Box)
        self.setStyleSheet("""
            QFrame {
                border: 2px solid #4CAF50;
                border-radius: 10px;
                padding: 10px;
                margin: 5px;
                background-color: #f9f9f9;
            }
            QFrame:hover {
                background-color: #e8f5e8;
                border-color: #45a049;
            }
        """)
        
        layout = QVBoxLayout()
        
        # Test name
        name_label = QLabel(f"Test: {self.test_data.get('name', 'Unknown Test')}")
        name_label.setFont(QFont("Arial", 14, QFont.Weight.Bold))
        name_label.setStyleSheet("color: #2c3e50; margin-bottom: 5px;")
        
        # Test details
        admin_name = self.test_data.get('admin', {}).get('name', 'Unknown Admin')
        admin_label = QLabel(f"Created by: {admin_name}")
        admin_label.setStyleSheet("color: #7f8c8d; font-size: 12px;")
        
        date_str = self.test_data.get('date', 'Unknown Date')
        time_str = self.test_data.get('time', 'Unknown Time')
        datetime_label = QLabel(f"Date: {date_str} | Time: {time_str}")
        datetime_label.setStyleSheet("color: #7f8c8d; font-size: 12px;")

        # Editable link field: allow user to update the test URL before launching
        edit_link = self.test_data.get('url', '')
        self.edit_link_input = QLineEdit(edit_link)
        self.edit_link_input.setPlaceholderText("Edit test link")
        # keep styling similar to labels but as a small input
        self.edit_link_input.setStyleSheet("color: #2c3e50; font-size: 12px; padding:4px; margin:4px 0;")

        # Launch button
        launch_btn = QPushButton("Launch Test")
        launch_btn.setStyleSheet("""
            QPushButton {
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 10px;
                border-radius: 5px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #45a049;
            }
        """)
        launch_btn.clicked.connect(self.launch_test)
        
        layout.addWidget(name_label)
        layout.addWidget(admin_label)
        layout.addWidget(datetime_label)
        # add the editable link input so users can change the URL before launching
        layout.addWidget(self.edit_link_input)
        layout.addWidget(launch_btn)
        
        self.setLayout(layout)
    
    def launch_test(self):
        """Launch the test in secure browser"""
        # Use the edited link from the input field, fallback to original if empty
        test_url = self.edit_link_input.text().strip() or self.test_data.get('url')
        if test_url:
            # Get the path to the browser folder main.py
            current_file = os.path.abspath(__file__)
            client_dir = os.path.dirname(current_file)
            browser_script = os.path.join(client_dir, "browser", "main.py")
            
            try:
                print(f"Current file: {current_file}")
                print(f"Client dir: {client_dir}")
                print(f"Browser script path: {browser_script}")
                print(f"Browser script exists: {os.path.exists(browser_script)}")
                
                if not os.path.exists(browser_script):
                    QMessageBox.warning(self, "Error", 
                                      f"Secure browser not found at:\n{browser_script}\n\nPlease ensure the browser folder exists in the same directory.")
                    return
                
                # Launch the secure browser with the test URL
                print(f"Launching browser with URL: {test_url}")
                process = subprocess.Popen([
                    sys.executable, 
                    browser_script,
                    test_url
                ], cwd=os.path.dirname(browser_script))
                
                QMessageBox.information(self, "Test Launched", 
                                      f"Test '{self.test_data.get('name')}' launched in secure browser!\n\nThe secure browser window will open shortly.")
                
            except Exception as e:
                QMessageBox.critical(self, "Launch Error", 
                                   f"Failed to launch secure browser:\n{str(e)}\n\nPath checked: {browser_script}")
        else:
            QMessageBox.warning(self, "Error", "Test URL not available!")

class LoginWidget(QWidget):
    """Login/Register interface"""
    login_success = pyqtSignal(dict)
    
    def __init__(self, api_client):
        super().__init__()
        self.api_client = api_client
        self.init_ui()
    
    def init_ui(self):
        layout = QVBoxLayout()
        
        # Title
        title = QLabel("OmniProctor Test Launcher")
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        title.setFont(QFont("Arial", 24, QFont.Weight.Bold))
        title.setStyleSheet("color: #2c3e50; margin: 20px;")
        
        # Login Form
        form_frame = QFrame()
        form_frame.setFrameStyle(QFrame.Shape.Box)
        form_frame.setStyleSheet("""
            QFrame {
                border: 2px solid #bdc3c7;
                border-radius: 10px;
                padding: 20px;
                background-color: white;
            }
        """)
        
        form_layout = QVBoxLayout()
        
        # Input fields
        self.name_input = QLineEdit()
        self.name_input.setPlaceholderText("Full Name (for registration)")
        self.name_input.setStyleSheet(self.input_style())
        self.name_input.hide()  # Hidden by default
        
        self.email_input = QLineEdit()
        self.email_input.setPlaceholderText("Email Address")
        self.email_input.setStyleSheet(self.input_style())
        
        self.password_input = QLineEdit()
        self.password_input.setPlaceholderText("Password")
        self.password_input.setEchoMode(QLineEdit.EchoMode.Password)
        self.password_input.setStyleSheet(self.input_style())
        
        # Buttons
        self.login_btn = QPushButton("Login")
        self.login_btn.setStyleSheet(self.button_style("#3498db"))
        self.login_btn.clicked.connect(self.login)
        
        self.register_btn = QPushButton("Register")
        self.register_btn.setStyleSheet(self.button_style("#e74c3c"))
        self.register_btn.clicked.connect(self.register)
        
        # Toggle button
        self.toggle_btn = QPushButton("Need to register? Click here")
        self.toggle_btn.setStyleSheet("""
            QPushButton {
                background: none;
                border: none;
                color: #3498db;
                text-decoration: underline;
                padding: 5px;
            }
            QPushButton:hover {
                color: #2980b9;
            }
        """)
        self.toggle_btn.clicked.connect(self.toggle_mode)
        
        # Test connection button
        self.test_conn_btn = QPushButton("Test Server Connection")
        self.test_conn_btn.setStyleSheet(self.button_style("#17a2b8"))
        self.test_conn_btn.clicked.connect(self.test_connection)
        
        # Status label
        self.status_label = QLabel("")
        self.status_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.status_label.setStyleSheet("color: #e74c3c; margin: 10px;")
        
        form_layout.addWidget(self.name_input)
        form_layout.addWidget(self.email_input)
        form_layout.addWidget(self.password_input)
        form_layout.addWidget(self.login_btn)
        form_layout.addWidget(self.register_btn)
        form_layout.addWidget(self.toggle_btn)
        form_layout.addWidget(self.test_conn_btn)
        form_layout.addWidget(self.status_label)
        
        form_frame.setLayout(form_layout)
        
        layout.addWidget(title)
        layout.addWidget(form_frame)
        layout.addStretch()
        
        self.setLayout(layout)
        
        # Initial mode (login)
        self.is_register_mode = False
        self.update_ui_mode()
    
    def input_style(self):
        return """
            QLineEdit {
                padding: 12px;
                border: 2px solid #bdc3c7;
                border-radius: 5px;
                font-size: 14px;
                margin: 5px;
            }
            QLineEdit:focus {
                border-color: #3498db;
            }
        """
    
    def button_style(self, color):
        return f"""
            QPushButton {{
                background-color: {color};
                color: white;
                border: none;
                padding: 12px;
                border-radius: 5px;
                font-size: 14px;
                font-weight: bold;
                margin: 5px;
            }}
            QPushButton:hover {{
                opacity: 0.8;
            }}
        """
    
    def toggle_mode(self):
        self.is_register_mode = not self.is_register_mode
        self.update_ui_mode()
        self.status_label.setText("")
    
    def update_ui_mode(self):
        if self.is_register_mode:
            self.name_input.show()
            self.login_btn.hide()
            self.register_btn.show()
            self.toggle_btn.setText("Already have an account? Login here")
        else:
            self.name_input.hide()
            self.register_btn.hide()
            self.login_btn.show()
            self.toggle_btn.setText("Need to register? Click here")
    
    def login(self):
        email = self.email_input.text().strip()
        password = self.password_input.text().strip()
        
        if not email or not password:
            self.status_label.setText("Please enter both email and password")
            return
        
        self.login_btn.setText("Logging in...")
        self.login_btn.setEnabled(False)
        
        success, message = self.api_client.login(email, password)
        
        if success:
            self.status_label.setText("")
            self.login_success.emit(self.api_client.user_data)
        else:
            self.status_label.setText(f"Login failed: {message}")
        
        self.login_btn.setText("Login")
        self.login_btn.setEnabled(True)
    
    def register(self):
        name = self.name_input.text().strip()
        email = self.email_input.text().strip()
        password = self.password_input.text().strip()
        
        if not name or not email or not password:
            self.status_label.setText("Please fill in all fields")
            return
        
        self.register_btn.setText("Registering...")
        self.register_btn.setEnabled(False)
        
        success, message = self.api_client.register(name, email, password)
        
        if success:
            self.status_label.setText("Registration successful! Please login.")
            self.toggle_mode()  # Switch to login mode
        else:
            self.status_label.setText(f"Registration failed: {message}")
        
        self.register_btn.setText("Register")
        self.register_btn.setEnabled(True)
    
    def test_connection(self):
        """Test connection to backend server"""
        self.test_conn_btn.setText("Testing...")
        self.test_conn_btn.setEnabled(False)
        
        success, message = self.api_client.test_connection()
        
        if success:
            self.status_label.setStyleSheet("color: #27ae60; margin: 10px;")
            self.status_label.setText(f"{message}")
        else:
            self.status_label.setStyleSheet("color: #e74c3c; margin: 10px;")
            self.status_label.setText(f"{message}")
        
        self.test_conn_btn.setText("Test Server Connection")
        self.test_conn_btn.setEnabled(True)

class TestsWidget(QWidget):
    """Display available tests"""
    logout_requested = pyqtSignal()
    
    def __init__(self, api_client, user_data):
        super().__init__()
        self.api_client = api_client
        self.user_data = user_data
        self.init_ui()
        self.load_tests()
    
    def init_ui(self):
        layout = QVBoxLayout()
        
        # Header
        header_layout = QHBoxLayout()
        
        welcome_label = QLabel(f"Welcome, {self.user_data.get('name', 'User')}!")
        welcome_label.setFont(QFont("Arial", 18, QFont.Weight.Bold))
        welcome_label.setStyleSheet("color: #2c3e50; margin: 10px;")
        
        refresh_btn = QPushButton("🔄 Refresh")
        refresh_btn.setStyleSheet(self.button_style("#17a2b8"))
        refresh_btn.clicked.connect(self.load_tests)
        
        logout_btn = QPushButton("Logout")
        logout_btn.setStyleSheet(self.button_style("#dc3545"))
        logout_btn.clicked.connect(self.logout)
        
        header_layout.addWidget(welcome_label)
        header_layout.addStretch()
        header_layout.addWidget(refresh_btn)
        header_layout.addWidget(logout_btn)
        
        # Tests section
        tests_label = QLabel("Available Tests:")
        tests_label.setFont(QFont("Arial", 16, QFont.Weight.Bold))
        tests_label.setStyleSheet("color: #2c3e50; margin: 10px 0;")
        
        # Scroll area for tests
        scroll_area = QScrollArea()
        scroll_area.setWidgetResizable(True)
        scroll_area.setStyleSheet("""
            QScrollArea {
                border: 1px solid #bdc3c7;
                border-radius: 5px;
            }
        """)
        
        self.tests_widget = QWidget()
        self.tests_layout = QVBoxLayout(self.tests_widget)
        scroll_area.setWidget(self.tests_widget)
        
        # Status label
        self.status_label = QLabel("Loading tests...")
        self.status_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self.status_label.setStyleSheet("color: #7f8c8d; font-size: 14px; padding: 20px;")
        
        layout.addLayout(header_layout)
        layout.addWidget(tests_label)
        layout.addWidget(scroll_area)
        layout.addWidget(self.status_label)
        
        self.setLayout(layout)
    
    def button_style(self, color):
        return f"""
            QPushButton {{
                background-color: {color};
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                font-weight: bold;
                margin: 5px;
            }}
            QPushButton:hover {{
                opacity: 0.8;
            }}
        """
    
    def load_tests(self):
        self.status_label.setText("Loading tests...")
        
        # Clear existing tests
        for i in reversed(range(self.tests_layout.count())): 
            item = self.tests_layout.itemAt(i)
            if item:
                widget = item.widget()
                if widget:
                    widget.setParent(None)
        
        success, data = self.api_client.get_active_tests()
        
        if success:
            if data:
                self.status_label.setText(f"Found {len(data)} active test(s)")
                for test in data:
                    test_card = TestCard(test)
                    self.tests_layout.addWidget(test_card)
                
                # Add stretch to push cards to top
                self.tests_layout.addStretch()
            else:
                self.status_label.setText("No active tests available")
        else:
            self.status_label.setText(f"Failed to load tests: {data}")
    
    def logout(self):
        self.logout_requested.emit()

class TestLauncherApp(QMainWindow):
    """Main application window"""
    def __init__(self):
        super().__init__()
        self.api_client = APIClient()
        self.init_ui()
    
    def init_ui(self):
        self.setWindowTitle("OmniProctor Test Launcher")
        self.setGeometry(100, 100, 800, 600)
        
        # Set application style
        self.setStyleSheet("""
            QMainWindow {
                background-color: #ecf0f1;
            }
        """)
        
        # Create stacked widget for different screens
        self.stacked_widget = QStackedWidget()
        self.setCentralWidget(self.stacked_widget)
        
        # Create login widget
        self.login_widget = LoginWidget(self.api_client)
        self.login_widget.login_success.connect(self.show_tests)
        self.stacked_widget.addWidget(self.login_widget)
        
        # Show login screen initially
        self.stacked_widget.setCurrentWidget(self.login_widget)
    
    def show_tests(self, user_data):
        """Switch to tests view after successful login"""
        self.tests_widget = TestsWidget(self.api_client, user_data)
        self.tests_widget.logout_requested.connect(self.show_login)
        self.stacked_widget.addWidget(self.tests_widget)
        self.stacked_widget.setCurrentWidget(self.tests_widget)
    
    def show_login(self):
        """Switch back to login view"""
        # Remove the tests widget
        if hasattr(self, 'tests_widget'):
            self.stacked_widget.removeWidget(self.tests_widget)
            self.tests_widget.deleteLater()
        
        # Clear API client data
        self.api_client.token = None
        self.api_client.user_data = None
        
        # Clear login form
        self.login_widget.email_input.clear()
        self.login_widget.password_input.clear()
        self.login_widget.name_input.clear()
        self.login_widget.status_label.setText("")
        
        # Switch to login view
        self.stacked_widget.setCurrentWidget(self.login_widget)

def main():
    app = QApplication(sys.argv)
    
    # Set application properties
    app.setApplicationName("OmniProctor Test Launcher")
    app.setApplicationVersion("1.0")
    
    # Create and show main window
    window = TestLauncherApp()
    window.show()
    
    sys.exit(app.exec())

if __name__ == "__main__":
    main()