# lusca-wrapper

为lusca.csrf添加ignore功能，对特定URL关闭csrf功能

## 用法

### 安装

```bash
npm i lusca-wrapper --save
```

### config.json

```json
{
    "appsec": {
        "enabled": true,
        "priority": 110,
        "module": {
            "name": "lusca-wrapper",
            "arguments": [
                {
                    "csrf": {
                        "ignore": ["/api/:action"]
                    },
                    "p3p": false,
                    "csp": false
                }
            ]
        }
    }
}
```

其中csrf.ignore必须为数组