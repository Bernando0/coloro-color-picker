pipeline {
  agent any
  environment {
    APP_NAME = 'coloro-color-picker'
    IMAGE    = "${APP_NAME}"
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
          docker stop "$IMAGE"
          docker build -t "$IMAGE" .
          docker image ls | head -n 5
        '''
      }
    }

    stage('Deploy (compose up)') {
      steps {
        sh '''
           docker run -p 3001:3001 coloro-color-picker -d

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
