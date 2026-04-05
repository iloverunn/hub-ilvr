PAQUETE ILVR LISTO PARA SUBIR

Archivos incluidos:
- index.html
- manifest.json
- sw.js

Que ya viene corregido:
- Lectura del Google Sheet correcto
- Parser CSV más robusto
- Soporte para imagen_url, imagen y foto
- Soporte para links directos, Drive, gs:// y paths de Firebase Storage
- Service Worker corregido para no cachear datos dinámicos
- PWA estable para Netlify

Como subir en Netlify:
1. Reemplaza index.html por este archivo.
2. Reemplaza sw.js por este archivo.
3. Reemplaza manifest.json por este archivo.
4. Mantén en la raíz los logos: logo120.png, logo152.png, logo167.png, logo180.png, logo192.png y logo512.png.
5. Publica de nuevo.
6. En tu iPhone, fuerza una recarga o cierra y vuelve a abrir la app.

Si sigues viendo la versión vieja:
- Abre la web en Safari
- Recarga 2 veces
- Si estaba instalada como app, elimina el icono y vuelve a agregarla

Dato importante:
Las imágenes solo se verán si la URL del Sheet o Firebase Storage tiene permisos de lectura.
