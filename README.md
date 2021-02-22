# Melhor Envio - Avaliação para Engenheiro DevOps

Este é um monorepo com quatro serviços que são "deployados" e versionados separadamente.
Dentro de cada diretório há um arquivo VERSION que serve para indicar a versão do serviço e verificar quais foram modificados e, assim, "buildar" apenas estes que foram modificados e publicar a imagem no Docker Hub.
