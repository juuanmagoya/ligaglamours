# 🏆 Liga Glamour

**Plataforma web de gestión para una liga competitiva de Esports.**

Liga Glamour es una plataforma desarrollada para centralizar la administración y gestión operativa de una liga de Esports, permitiendo organizar divisiones, equipos, jugadores y líderes desde un único sistema.

La aplicación cuenta con diferentes niveles de acceso, principalmente **Administrador** y **Líder de equipo**, con funcionalidades y permisos específicos según la responsabilidad de cada usuario dentro de la liga.

El sistema se encuentra **desplegado en producción** y fue utilizado por más de **40 usuarios activos**.

🌐 **Producción:** [ligaglamours.vercel.app](https://ligaglamours.vercel.app)

---

## 🎯 Objetivo

El objetivo de Liga Glamour es digitalizar y centralizar la gestión de una liga competitiva de Esports, reemplazando procesos administrativos dispersos por una plataforma que permita gestionar de forma estructurada la información de la competición.

El sistema permite administrar las principales entidades de la liga y sus relaciones:

* Divisiones
* Equipos
* Jugadores
* Líderes de equipo
* Usuarios y permisos

La plataforma fue diseñada teniendo en cuenta las necesidades de los distintos usuarios que participan en la gestión de la competición.

---

## 👥 Roles y permisos

### Administrador

El administrador cuenta con acceso a las funcionalidades generales de gestión de la liga, permitiendo administrar sus principales entidades y mantener el control sobre la estructura de la competición.

### Líder de equipo

El líder de equipo dispone de funcionalidades orientadas a la administración de su propio equipo y sus jugadores, con acceso limitado según los permisos correspondientes a su rol.

La separación de roles permite mantener un control adecuado sobre las acciones y la información disponible para cada usuario.

---

## ⚙️ Funcionalidades principales

* 🏆 Gestión de divisiones competitivas.
* 👥 Administración de equipos.
* 🎮 Gestión de jugadores.
* 👤 Gestión de líderes de equipo.
* 🔐 Autenticación y control de acceso.
* 🛡️ Sistema de roles y permisos.
* 🖼️ Gestión y almacenamiento de imágenes.
* 📊 Interfaces de gestión según el tipo de usuario.
* 📱 Diseño responsive.
* ☁️ Despliegue en producción.

---

## 🏗️ Arquitectura

El proyecto utiliza una **arquitectura basada en features**, organizando el código alrededor de las funcionalidades y dominios principales de la aplicación.

Esta decisión permite que cada funcionalidad mantenga agrupados sus componentes y lógica relacionados, evitando que el proyecto dependa únicamente de una organización global por tipo de archivo.

La elección de esta arquitectura busca principalmente mejorar:

* **Mantenibilidad:** cada funcionalidad tiene un contexto claramente definido.
* **Escalabilidad:** permite incorporar nuevas features sin afectar innecesariamente las existentes.
* **Separación de responsabilidades:** cada dominio concentra su propia lógica.
* **Organización:** facilita encontrar y modificar el código relacionado con una funcionalidad determinada.
* **Trabajo futuro:** proporciona una estructura preparada para que la plataforma pueda seguir creciendo.

La arquitectura está pensada para que la aplicación pueda evolucionar junto con las necesidades de la liga, incorporando nuevas funcionalidades sin generar una estructura difícil de mantener.

---

## 🧩 Stack tecnológico

| Tecnología           | Uso                                      |
| -------------------- | ---------------------------------------- |
| **Next.js**          | Framework principal de la aplicación     |
| **React**            | Construcción de interfaces y componentes |
| **TypeScript**       | Tipado estático y seguridad del código   |
| **Tailwind CSS**     | Diseño y estilos de la interfaz          |
| **Supabase**         | Servicios backend e infraestructura      |
| **PostgreSQL**       | Base de datos relacional                 |
| **Supabase Storage** | Almacenamiento de imágenes y archivos    |
| **Vercel**           | Despliegue de la aplicación              |

---

## 🗄️ Base de datos y almacenamiento

La aplicación utiliza **PostgreSQL mediante Supabase** para la persistencia de datos.

La base de datos permite modelar y relacionar las diferentes entidades que forman parte de la competición, manteniendo organizada la información de divisiones, equipos, jugadores, líderes y usuarios.

Además, se utiliza **Supabase Storage** para gestionar imágenes y archivos asociados a las entidades de la plataforma.

---

## 🔐 Autenticación y autorización

La plataforma implementa un sistema de autenticación y autorización basado en roles.

Los permisos determinan las funcionalidades disponibles para cada usuario, diferenciando principalmente las capacidades de un **Administrador** y un **Líder de equipo**.

Esto permite controlar el acceso a las distintas operaciones y mantener separadas las responsabilidades dentro de la plataforma.

---

## 📱 Interfaz

La interfaz fue desarrollada utilizando un enfoque **responsive**, permitiendo utilizar la plataforma desde diferentes tamaños de pantalla.

Las interfaces se adaptan al contexto y rol del usuario, priorizando una navegación clara y enfocada en las tareas de gestión correspondientes.

---

## 🚀 Producción

Liga Glamour se encuentra desplegado y operativo en producción.

**Más de 40 usuarios lideres y 400 jugadores.**

🌐 **[ligaglamours.vercel.app](https://ligaglamours.vercel.app)**

---

## 📌 Estado

**En producción.**

Liga Glamour constituye una solución funcional para la gestión de una liga competitiva de Esports y una base preparada para incorporar nuevas funcionalidades a medida que evolucionen las necesidades de la competición.

---

## 👨‍💻 Autor

**Juan Manuel Aguirre**

Full Stack Developer
