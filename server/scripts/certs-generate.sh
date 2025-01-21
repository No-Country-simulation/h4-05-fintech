rm -rf certs

# Crear directorio para certificados autogenerados
mkdir certs

# Estar en el directorio 'certs'
cd certs

# Autogenerar certificados
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt