Generate private keys and certificate using open SSL
              openssl genrsa 1024 > private.key
              openssl req -new -key private.key -out cert.csr
              openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem