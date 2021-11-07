## MS-SETTINGS_CLIENT

#### 1. Requirements Installation

* Install NodeJs Version 16.13.0
* Yarn 1.22.4
* Git

#### 2.  Generator library

```bash
yarn lib
```

#### 3.  Example use the library

##### 3.1.  Using the library to load application settings

```bash
import { loadSettings } from 'ms_settings_client';
```

```bash
    const applicationName = 'API_NAME';
    const applicationUuid = process.env.APP_IDENTIFIER;
  
    await loadSettings({
        urlSubscribe: `${process.env.BEPAY_MS_SETTING_URL}/v1/application/subscribe?applicationUuid=${applicationUuid}&applicationName=${applicationName}`,
        urlGetSettings: `${process.env.BEPAY_MS_SETTING_URL}/v1/environment/${applicationUuid}`,
        applicationUuid,
        applicationName,
        secretKeyGlobal: process.env.MS_SETTING_SECRET_KEY_GLOBAL,
    });
```

##### 3.2.  Using the library to encrypt and decrypt

```bash
import { cryptoDecrypt } from 'ms_settings_client';
```

```bash
  const secretKey = applicationUuid || process.env.MS_SETTING_SECRET_KEY_GLOBAL;
  const message = await cryptoDecrypt.encrypt(value, secretKey);
  const message = await cryptoDecrypt.decrypt(value, secretKey);
```
