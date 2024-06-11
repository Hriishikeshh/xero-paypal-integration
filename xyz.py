import requests

# Define the API endpoint for document upload
api_endpoint = 'https://api.xero.com/upload_document'

# Set up headers with the access token
headers = {
    'Authorization': 'Bearer <your_access_token>',
    'Content-Type': 'application/json'
}

# Example data for document upload (replace with actual data)
document_data = {
    'name': 'Document Name',
    'file': '/path/to/your/document.pdf'
}

# Make the API call to upload the document
response = requests.post(api_endpoint, headers=headers, json=document_data)

# Check the response status and handle accordingly
if response.status_code == 200:
    print('Document uploaded successfully.')
else:
    print('Failed to upload document:', response.text)
