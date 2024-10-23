
# Yerel NPM Paketi Oluşturma ve Komut Satırı Aracı Ekleme

Bu rehberde, yerel bir NPM paketi oluşturup, bu pakete `bin` dizini içinde bir komut satırı aracı ekleyeceğiz ve bu paketi nasıl test edebileceğinizi adım adım anlatacağız.

---

## İçindekiler

1. [Paket Oluşturma ve Komut Satırı Aracı Ekleme](#1-paket-oluşturma-ve-komut-satırı-aracı-ekleme)
2. [Paketi Yerel Olarak Bağlama](#2-paketi-yerel-olarak-bağlama)
3. [Komutu Test Etme](#3-komutu-test-etme)
4. [Test Projesinde Paketi Kullanma](#4-test-projesinde-paketi-kullanma)
5. [Komut Satırı Aracının Geliştirilmesi](#5-komut-satırı-aracının-geliştirilmesi)
6. [Ek Notlar ve İpuçları](#6-ek-notlar-ve-ipuçları)

---

## 1. Paket Oluşturma ve Komut Satırı Aracı Ekleme

### a. Proje Dizini Oluşturma

Öncelikle, paketiniz için bir dizin oluşturun ve bu dizine gidin:

```bash
mkdir projectName
cd projectName
```

### b. NPM Projesini Başlatma

`npm init` komutunu kullanarak yeni bir NPM projesi başlatın. `-y` bayrağı varsayılan ayarlarla hızlı bir şekilde başlatır.

```bash
npm init -y
```

Bu komut bir `package.json` dosyası oluşturacaktır.

### c. `bin` Dizini ve Komut Dosyası Oluşturma

Paketinizin `bin` dizini altında bir komut dosyası oluşturun. Örneğin, `projectName` adında bir komut eklemek için:

```bash
mkdir bin
touch bin/projectName
```

`bin/projectName` dosyasının içeriğini aşağıdaki gibi düzenleyin:

```javascript
#!/usr/bin/env node

console.log("Merhaba, komut satırı aracı!");
```

### d. Komut Dosyasını Çalıştırılabilir Hale Getirme

Komut dosyanızın çalıştırılabilir olması için izinlerini ayarlayın:

```bash
chmod +x bin/projectName
```

### e. `package.json` Dosyasını Düzenleme

`package.json` dosyasını açın ve `bin` alanını ekleyin:

```json
{
  "name": "projectName",
  "version": "1.0.0",
  "description": "Yerel bir komut satırı aracı",
  "bin": {
    "projectName": "./bin/projectName"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Bu ayar, `projectName` komutunun `./bin/projectName` dosyasını işaret ettiğini belirtir.

---

## 2. Paketi Yerel Olarak Bağlama

### a. NPM Link Kullanımı

Paketinizi global `node_modules` dizinine sembolik link olarak eklemek için aşağıdaki komutu çalıştırın:

```bash
npm link
```

Bu işlem, paketinizi global olarak kullanılabilir hale getirir ve `projectName` komutunu sisteminizde tanımlar.

---

## 3. Komutu Test Etme

### a. Terminalde Komutu Çalıştırma

Artık herhangi bir dizinde `projectName` komutunu çalıştırabilirsiniz:

```bash
projectName
```

Konsolda şu çıktıyı görmelisiniz:

```
Merhaba, bu benim komut satırı aracım!
```

---

## 4. Test Projesinde Paketi Kullanma

### a. Test Projesini Oluşturma

Yeni bir dizin oluşturun ve test projenizi başlatın:

```bash
mkdir test-projesi
cd test-projesi
npm init -y
```

### b. Paketi Test Projesine Bağlama

Test projesi dizininde, yerel paketinizi proje içinde kullanabilmek için aşağıdaki komutu çalıştırın:

```bash
npm link projectName
```

Bu komut, global olarak linklenmiş olan `projectName` paketini test projenizin `node_modules` dizinine sembolik link olarak ekler.

### c. Proje İçinde Komutu Kullanma

Artık test projeniz içinde de `projectName` komutunu kullanabilirsiniz.

### d. `package.json` Dosyasında Script Tanımlama (Opsiyonel)

Eğer komutu NPM scriptleri içinde kullanmak isterseniz, `package.json` dosyanıza bir script ekleyebilirsiniz:

```json
{
  "name": "test-projesi",
  "version": "1.0.0",
  "scripts": {
    "benim-komut": "projectName"
  },
  "dependencies": {},
  "devDependencies": {}
}
```

Komutu çalıştırmak için:

```bash
npm run benim-komut
```

---

## 5. Komut Satırı Aracının Geliştirilmesi

### a. Komuta Argümanlar Ekleme

`bin/projectName` dosyasını güncelleyerek komut satırı argümanlarını kullanabilirsiniz:

```javascript
#!/usr/bin/env node

const args = process.argv.slice(2);
console.log("Girdiğiniz argümanlar:", args);
```

Komutu şu şekilde çalıştırırsanız:

```bash
projectName merhaba dünya
```

Çıktı:

```
Girdiğiniz argümanlar: [ 'merhaba', 'dünya' ]
```

---

## 6. Ek Notlar ve İpuçları

- **Paket Adı ve Komut Adı:** `package.json` dosyasındaki `"name"` alanı paketinizin adıdır. `"bin"` alanında tanımladığınız anahtar ise kullanacağınız komutun adıdır.

- **Global ve Yerel Kullanım:** `npm link` komutu paketinizi global olarak linkler, böylece komutunuz terminalde her yerde kullanılabilir hale gelir. Ancak test projenizde özel olarak paketinizin sürümünü test etmek isterseniz, `npm link projectName` komutunu test projesi dizininde çalıştırmalısınız.

- **Linkleri Kaldırma:**

  - Paket dizininde linki kaldırmak için:

    ```bash
    npm unlink
    ```

  - Global olarak yüklenmiş komutu kaldırmak için:

    ```bash
    npm rm -g projectName
    ```

  - Test projesinde linki kaldırmak için:

    ```bash
    npm unlink projectName
    ```

- **Paketinizi Yayınlama:**

  Eğer paketiniz hazırsa ve NPM üzerinde yayınlamak isterseniz, `npm publish` komutunu kullanabilirsiniz. Ancak öncesinde paket adınızın benzersiz olduğundan ve NPM'in kurallarına uygun olduğundan emin olun.

- **Alternatif Yöntem - Yerel Paket Kurulumu:**

  Eğer `npm link` kullanmak istemiyorsanız, paketinizi paketleyip test projenize doğrudan kurabilirsiniz:

  - **Paketleme:**

    Paket dizininde:

    ```bash
    npm pack
    ```

    Bu komut, paketinizi `.tgz` uzantılı bir dosya olarak paketler.

  - **Kurulum:**

    Test projesi dizininde:

    ```bash
    npm install ../projectName/projectName-1.0.0.tgz
    ```

    Dosya yolunu ve dosya adını kendi paketinizin adına göre düzenleyin.

---

Umarız bu rehber, yerel bir NPM paketi oluşturup, `bin` dizini içinde bir komut satırı aracı ekleyerek nasıl test edebileceğinizi anlamanıza yardımcı olmuştur. Eğer herhangi bir sorunuz varsa veya yardıma ihtiyaç duyarsanız, lütfen çekinmeden bize ulaşın!
