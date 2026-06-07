# ✝ BÍBLIA CATÓLICA — GUIA DE COMPILAÇÃO NO TERMUX
# Gera o AAB final para publicar na Google Play Store
# =====================================================

## PASSO 1 — Instalar dependências no Termux
# (execute uma linha por vez)

pkg update && pkg upgrade -y
pkg install -y nodejs git openjdk-17
npm install -g npm@latest

## PASSO 2 — Instalar Android SDK pelo Termux
# Baixe o Command Line Tools em:
# https://developer.android.com/studio#command-line-tools-only
# Coloque o zip em /sdcard/Downloads/cmdline-tools.zip

mkdir -p ~/android-sdk/cmdline-tools
cd ~/android-sdk/cmdline-tools
unzip /sdcard/Downloads/cmdline-tools.zip
mv cmdline-tools latest

# Adicionar ao PATH (cole no ~/.bashrc)
echo 'export ANDROID_HOME=$HOME/android-sdk' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin' >> ~/.bashrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.bashrc
source ~/.bashrc

## PASSO 3 — Aceitar licenças e instalar SDK
sdkmanager --licenses
sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"

## PASSO 4 — Copiar o projeto para o Termux
# Coloque a pasta biblia-app em /sdcard/biblia-app
# Depois copie para o home do Termux:

cp -r /sdcard/biblia-app ~/biblia-app
cd ~/biblia-app

## PASSO 5 — Instalar dependências do projeto
npm install
npm install -g @capacitor/cli

## PASSO 6 — Build do React + sync Capacitor
npm run build
npx cap add android
npx cap sync android

## PASSO 7 — Adicionar AdMob ao Android (opcional)
# No arquivo android/app/build.gradle, adicione em dependencies:
# implementation 'com.google.android.gms:play-services-ads:23.0.0'
#
# No arquivo android/app/src/main/AndroidManifest.xml, dentro de <application>:
# <meta-data
#     android:name="com.google.android.gms.ads.APPLICATION_ID"
#     android:value="ca-app-pub-9088121551421320~6444146110"/>

## PASSO 8 — Gerar AAB (Android App Bundle)
cd ~/biblia-app/android
chmod +x gradlew
./gradlew bundleRelease

# O AAB estará em:
# android/app/build/outputs/bundle/release/app-release.aab

## PASSO 9 — Assinar o AAB (obrigatório para Play Store)
# Gerar keystore (faça isso uma vez só e GUARDE BEM):
keytool -genkey -v \
  -keystore ~/biblia-catolica.keystore \
  -alias biblia \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Assinar o AAB:
jarsigner -verbose \
  -sigalg SHA256withRSA \
  -digestalg SHA-256 \
  -keystore ~/biblia-catolica.keystore \
  ~/biblia-app/android/app/build/outputs/bundle/release/app-release.aab \
  biblia

# Verificar assinatura:
jarsigner -verify \
  ~/biblia-app/android/app/build/outputs/bundle/release/app-release.aab

## PASSO 10 — Upload para Play Store
# 1. Acesse https://play.google.com/console
# 2. Crie um novo app
# 3. Vá em Versões > Produção > Criar nova versão
# 4. Faça upload do arquivo app-release.aab
# 5. Preencha as informações e publique

## INFORMAÇÕES DO APP
# App ID: com.bibliacatolica.app
# Nome: Bíblia Católica
# AdMob App ID: ca-app-pub-9088121551421320~6444146110
# AdMob Ad Unit: ca-app-pub-9088121551421320/6514782938

## DICAS
# - Guarde o arquivo .keystore em lugar seguro
#   (sem ele não consegue atualizar o app na Play Store)
# - O primeiro build demora mais (baixando dependências Gradle)
# - Se der erro de memória no Gradle, crie o arquivo:
#   echo "org.gradle.jvmargs=-Xmx1536m" >> android/gradle.properties
