pipeline {
  agent any
  environment {
    APP_NAME = 'coloro-color-picker'
    IMAGE    = "${APP_NAME}:${env.BUILD_NUMBER}"
    DOCKER_BUILDKIT = '1'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

//     stage('Inject .env') {
//       steps {
//         withCredentials([file(credentialsId: 'nextjs_env_file', variable: 'DOTENV_FILE')]) {
//           sh '''
//             cp "$DOTENV_FILE" .env
//             chmod 600 .env
//           '''
//         }
//       }
//     }

    stage('Build image') {
      steps {
        sh '''
          docker build --pull -t "$IMAGE" .
          docker image ls | head -n 5
        '''
      }
    }

    stage('Deploy (compose up)') {
      steps {
        sh '''
          cat > docker-compose.yml <<'YAML'
          version: "3.9"
          services:
            frontend:
              image: ${IMAGE}
              container_name: ${APP_NAME}
              restart: unless-stopped
              env_file: .env
              ports:
                - "3000:3000"
          YAML

          docker compose down || true
          docker compose up -d
          docker ps --filter "name=${APP_NAME}"
        '''
      }
    }
  }

//   post {
//     always {
//       sh 'docker image prune -f || true'
//     }
//   }
}
