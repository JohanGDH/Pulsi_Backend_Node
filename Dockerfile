# Usa una imagen base de Node.js
FROM node:22

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --only=production

# Copia el tsconfig.json
COPY tsconfig.json ./

# Copia el resto de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3030

# Comando para ejecutar la aplicación
CMD ["node", "dist/index.js"]