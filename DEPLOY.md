# 🚀 Деплой FenixUz на сервер (Ubuntu + Nginx)

> **Домен:** fenixuz.uz
> **Сервер:** Ubuntu + Nginx
> **Путь проекта:** `/var/www/FenixUz/FenixUZ`
> **Путь frontend:** `/var/www/FenixUz/FenixUZ/frontend`

---

## Шаг 1. Установи права

```bash
sudo chown -R www-data:www-data /var/www/FenixUz/FenixUZ
sudo chmod -R 755 /var/www/FenixUz/FenixUZ
```

---

## Шаг 2. Создай конфиг Nginx

```bash
sudo nano /etc/nginx/sites-available/fenixuz.uz
```

Вставь:

```nginx
server {
    listen 80;
    server_name fenixuz.uz www.fenixuz.uz;

    root /var/www/FenixUz/FenixUZ/frontend;
    index index.html;

    # Основная локация
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Кэширование статики
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Кэширование JSON (переводы)
    location ~* \.json$ {
        expires 1d;
        add_header Cache-Control "public, no-transform";
    }

    # Безопасность
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip сжатие
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 256;

    # Логи
    access_log /var/log/nginx/fenixuz.uz.access.log;
    error_log /var/log/nginx/fenixuz.uz.error.log;
}
```

Сохрани: **Ctrl+O → Enter → Ctrl+X**

---

## Шаг 3. Активируй сайт

```bash
sudo ln -s /etc/nginx/sites-available/fenixuz.uz /etc/nginx/sites-enabled/
```

Проверь конфиг:
```bash
sudo nginx -t
```

Должно показать: `syntax is ok` и `test is successful`

---

## Шаг 4. Перезагрузи Nginx

```bash
sudo systemctl reload nginx
```

---

## Шаг 5. Проверь

Открой в браузере: **http://fenixuz.uz**

---

## Шаг 6. Установи SSL (HTTPS)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d fenixuz.uz -d www.fenixuz.uz
```

Проверь: **https://fenixuz.uz** ✅

Автообновление:
```bash
sudo certbot renew --dry-run
```

---

## 🔄 Как обновлять сайт

```bash
cd /var/www/FenixUz/FenixUZ
sudo git fetch origin
sudo git reset --hard origin/main
```

> ⚠️ После обновления зайди в **Cloudflare → Caching → Configuration → Purge Everything**

---

## 🔍 Если что-то не работает

```bash
sudo systemctl status nginx
sudo tail -20 /var/log/nginx/fenixuz.uz.error.log
```

---

## ⚠️ Не забудь

- **DNS:** `A` запись `fenixuz.uz` → IP сервера
- **DNS:** `A` запись `www.fenixuz.uz` → IP сервера
- **Файрвол:** `sudo ufw allow 'Nginx Full'`
