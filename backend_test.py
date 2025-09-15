#!/usr/bin/env python3
"""
Backend Testing Suite for RW Estratégia Digital
Tests the contact form API endpoints and functionality
"""

import requests
import json
import time
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'https://smart-web-rw.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend at: {API_BASE_URL}")

def test_api_root():
    """Test the root API endpoint"""
    print("\n=== Testing API Root Endpoint ===")
    try:
        response = requests.get(f"{API_BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            print("✅ API Root endpoint working")
            return True
        else:
            print("❌ API Root endpoint failed")
            return False
    except Exception as e:
        print(f"❌ API Root endpoint error: {str(e)}")
        return False

def test_contact_form_valid_data():
    """Test contact form with valid data"""
    print("\n=== Testing Contact Form - Valid Data ===")
    
    # Sample valid data as specified in the requirements
    test_data = {
        "name": "João Silva",
        "email": "joao.teste@email.com", 
        "phone": "48999999999",
        "service": "site-institucional",
        "message": "Gostaria de um orçamento para site institucional da minha empresa."
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/contact",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success") and response_data.get("id"):
                print("✅ Contact form submission successful")
                return True, response_data.get("id")
            else:
                print("❌ Contact form response missing success or id")
                return False, None
        else:
            print("❌ Contact form submission failed")
            return False, None
            
    except Exception as e:
        print(f"❌ Contact form submission error: {str(e)}")
        return False, None

def test_contact_form_validation():
    """Test contact form validation with invalid data"""
    print("\n=== Testing Contact Form - Data Validation ===")
    
    # Test cases for validation
    test_cases = [
        {
            "name": "Missing Name",
            "data": {
                "email": "test@email.com",
                "phone": "48999999999", 
                "service": "site-institucional",
                "message": "Test message with enough characters"
            }
        },
        {
            "name": "Invalid Email",
            "data": {
                "name": "Test User",
                "email": "invalid-email",
                "phone": "48999999999",
                "service": "site-institucional", 
                "message": "Test message with enough characters"
            }
        },
        {
            "name": "Short Message",
            "data": {
                "name": "Test User",
                "email": "test@email.com",
                "phone": "48999999999",
                "service": "site-institucional",
                "message": "Short"
            }
        },
        {
            "name": "Short Name",
            "data": {
                "name": "A",
                "email": "test@email.com", 
                "phone": "48999999999",
                "service": "site-institucional",
                "message": "Test message with enough characters"
            }
        }
    ]
    
    validation_passed = True
    
    for test_case in test_cases:
        print(f"\nTesting: {test_case['name']}")
        try:
            response = requests.post(
                f"{API_BASE_URL}/contact",
                json=test_case['data'],
                headers={"Content-Type": "application/json"}
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 422:  # Validation error expected
                print(f"✅ Validation correctly rejected: {test_case['name']}")
            elif response.status_code == 200:
                print(f"⚠️  Validation should have failed for: {test_case['name']}")
                validation_passed = False
            else:
                print(f"❌ Unexpected status code for: {test_case['name']}")
                validation_passed = False
                
        except Exception as e:
            print(f"❌ Error testing {test_case['name']}: {str(e)}")
            validation_passed = False
    
    return validation_passed

def test_contact_submissions_admin():
    """Test the admin endpoint to get contact submissions"""
    print("\n=== Testing Contact Submissions Admin Endpoint ===")
    
    try:
        response = requests.get(f"{API_BASE_URL}/contact-submissions")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            submissions = response.json()
            print(f"Number of submissions retrieved: {len(submissions)}")
            
            if len(submissions) > 0:
                print("Sample submission structure:")
                sample = submissions[0]
                for key in sample.keys():
                    print(f"  {key}: {sample[key]}")
                    
            print("✅ Contact submissions admin endpoint working")
            return True
        else:
            print("❌ Contact submissions admin endpoint failed")
            return False
            
    except Exception as e:
        print(f"❌ Contact submissions admin endpoint error: {str(e)}")
        return False

def test_cors_functionality():
    """Test CORS headers"""
    print("\n=== Testing CORS Functionality ===")
    
    try:
        # Test preflight request
        response = requests.options(
            f"{API_BASE_URL}/contact",
            headers={
                "Origin": "https://smart-web-rw.preview.emergentagent.com",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "Content-Type"
            }
        )
        
        print(f"Preflight Status Code: {response.status_code}")
        print("CORS Headers:")
        cors_headers = {k: v for k, v in response.headers.items() if 'access-control' in k.lower()}
        for header, value in cors_headers.items():
            print(f"  {header}: {value}")
            
        if response.status_code in [200, 204] and cors_headers:
            print("✅ CORS functionality working")
            return True
        else:
            print("❌ CORS functionality may have issues")
            return False
            
    except Exception as e:
        print(f"❌ CORS test error: {str(e)}")
        return False

def test_email_functionality():
    """Test email sending by submitting a form and checking response"""
    print("\n=== Testing Email Functionality ===")
    
    # Use a specific test case for email
    email_test_data = {
        "name": "Maria Santos - Teste Email",
        "email": "maria.teste@email.com",
        "phone": "48988887777", 
        "service": "consultoria-digital",
        "message": "Este é um teste da funcionalidade de email. Por favor, verifique se o email foi enviado para testgyminspirebyaquiles@gmail.com."
    }
    
    try:
        response = requests.post(
            f"{API_BASE_URL}/contact",
            json=email_test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            response_data = response.json()
            if response_data.get("success"):
                # Check if there's any note about email delay
                if "note" in response_data:
                    print(f"⚠️  Email may have issues: {response_data['note']}")
                    return False
                else:
                    print("✅ Email functionality appears to be working")
                    print("📧 Email should be sent to: testgyminspirebyaquiles@gmail.com")
                    return True
            else:
                print("❌ Email test failed - no success in response")
                return False
        else:
            print("❌ Email test failed - bad status code")
            return False
            
    except Exception as e:
        print(f"❌ Email test error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("🚀 Starting RW Estratégia Digital Backend Tests")
    print("=" * 60)
    
    test_results = {}
    
    # Test API Root
    test_results['api_root'] = test_api_root()
    
    # Test Contact Form with valid data
    contact_success, submission_id = test_contact_form_valid_data()
    test_results['contact_form_valid'] = contact_success
    
    # Test Contact Form validation
    test_results['contact_form_validation'] = test_contact_form_validation()
    
    # Test Admin endpoint
    test_results['admin_endpoint'] = test_contact_submissions_admin()
    
    # Test CORS
    test_results['cors'] = test_cors_functionality()
    
    # Test Email functionality
    test_results['email'] = test_email_functionality()
    
    # Summary
    print("\n" + "=" * 60)
    print("🏁 TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed - check details above")
    
    return test_results

if __name__ == "__main__":
    results = run_all_tests()