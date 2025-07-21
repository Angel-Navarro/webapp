#!/bin/sh

# Espera a que el contenedor 'db' esté listo antes de arrancar la app
echo "Esperando a que MySQL esté disponible en $DB_HOST:3306..."

until nc -z -v -w30 $DB_HOST 3306
do
  echo "Esperando a MySQL..."
  sleep 2
done

echo "MySQL está listo. Iniciando la aplicación..."
npm start