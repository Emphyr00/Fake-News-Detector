FROM node:18
RUN openssl version -v
RUN uname -a
RUN echo $DATABASE_URL

# Create app directory
WORKDIR /app

# Install prisma for the migration
RUN npm install -g prisma --unsafe-perm

# Copy schema and migration folder
ADD ./ ./prisma/

CMD [ "prisma", "migrate", "dev", "--name", "users"]