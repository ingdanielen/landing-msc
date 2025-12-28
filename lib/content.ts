export type Language = "es" | "en" | "zh"

export const content = {
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      quality: "Calidad",
      contact: "Contacto",
      request: "Solicitar Inspección",
    },
    hero: {
      title: "Inspecciones Marítimas Independientes en las que Puede Confiar.",
      subtitle: "Excelencia en la que Puede Depender.",
      description:
        "Realizamos inspecciones independientes, encuestas de carga, evaluaciones de buques y consultoría técnica para armadores, fletadores, aseguradoras y operadores portuarios en todo el mundo.",
      ctaPrimary: "Solicitar Inspección",
      ctaSecondary: "Soporte 24/7",
      highlights: [
        "Informes objetivos de terceros",
        "Respuesta rápida global",
        "Inspectores certificados",
        "Alineados con OMI/ISO",
      ],
    },
    about: {
      title: "Sobre Nosotros",
      description:
        "Organización independiente especializada en inspecciones integrales de buques, carga e infraestructura marítima.",
      mission: {
        title: "Misión",
        text: "Proveer inspecciones marítimas de tercera parte de forma objetiva, confiable y completa, y consultorías marítimas que apoyan la navegación segura, protegen el valor de los buques o artefactos navales y garantizan el cumplimiento normativo. Logramos esto mediante profesionales altamente calificados, metodologías avanzadas de inspección y un compromiso inquebrantable con la transparencia, la imparcialidad y un servicio excepcional al cliente.",
      },
      vision: {
        title: "Visión",
        text: "Ser la organización independiente de inspección marítima más confiable y reconocida globalmente, entregando precisión, integridad y excelencia técnica inquebrantables para salvaguardar las operaciones marítimas, los buques o artefactos navales y el medio ambiente.",
      },
      values: [
        {
          title: "Integridad e Imparcialidad",
          description: "Mantenemos los más altos estándares éticos en todas nuestras evaluaciones, garantizando objetividad y transparencia en cada informe que entregamos.",
        },
        {
          title: "Excelencia Técnica",
          description: "Nuestros profesionales certificados aplican metodologías avanzadas y conocimientos especializados para proporcionar evaluaciones precisas y confiables.",
        },
        {
          title: "Seguridad y Cumplimiento",
          description: "Aseguramos el cumplimiento estricto de normativas internacionales (IMO, ISO, SOLAS, MARPOL) para proteger vidas, bienes y el medio ambiente marino.",
        },
        {
          title: "Profesionalismo y Responsabilidad",
          description: "Cada inspección se realiza con el máximo rigor profesional, asumiendo la responsabilidad de nuestras evaluaciones y recomendaciones técnicas.",
        },
        {
          title: "Servicio Enfocado en el Cliente",
          description: "Priorizamos las necesidades de nuestros clientes, ofreciendo soluciones personalizadas y un servicio excepcional en cada interacción.",
        },
        {
          title: "Innovación y Mejora Continua",
          description: "Incorporamos tecnología de vanguardia, como inspecciones con drones, y mejoramos constantemente nuestros procesos para ofrecer el mejor servicio.",
        },
        {
          title: "Protección del Medio Ambiente",
          description: "Comprometidos con la sostenibilidad marítima, nuestras evaluaciones consideran el impacto ambiental y promueven prácticas responsables.",
        },
      ],
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones integrales para la industria marítima",
      items: [
        {
          title: "Inspecciones de Buques",
          desc: "Inspecciones precompra, de condición y relacionadas con clase, on-hire/off-hire y de bunkers, de daños y siniestros, y para clubes de protección e indemnización (P&I).",
          icon: "Ship",
          type: "vessel",
          image: "/images/footage/IMG_20181207_111709.webp",
        },
        {
          title: "Inspecciones a la Carga",
          desc: "Inspecciones de pre-embarque y descarga, evaluación de daños en carga, supervisión de carga y descarga, evaluación de carga suelta o fraccionada a granel y contenedores, inspección de cantidad por calados y servicios de conteo.",
          icon: "Container",
          type: "cargo",
          image: "/images/footage/IMG_20190405_150150.webp",
        },
        {
          title: "Consultoría Marítima",
          desc: "Auditorías e inspecciones de seguridad y protección (IGS/PBIP/MLC), asesoría técnica, investigación de incidentes marítimos y consultoría de cumplimiento normativo.",
          icon: "Briefcase",
          type: "consultancy",
          image: "/images/footage/IMG_20190406_095637.webp",
        },
        {
          title: "Puertos y Terminales",
          desc: "Evaluaciones de condición de terminales e inspecciones de atraque y amarre.",
          icon: "Anchor",
          type: "port",
          image: "/images/footage/IMG_20190406_172726.webp",
        },
        {
          title: "Servicios Especializados",
          desc: "Inspecciones aéreas con drones para áreas del buque de difícil acceso.",
          icon: "Drone",
          type: "specialized",
          image: "/images/footage/IMG_20190506_163718.webp",
        },
      ],
    },
    compliance: {
      title: "Calidad y Cumplimiento",
      text: "Todas nuestras operaciones se encuentran alineadas con ISO 9001:2015, Convenios de la IMO (SOLAS, MARPOL, MLC, etc.), Requisitos de Estado de Bandera, Reglas de las Sociedades de Clasificación, Directrices de aseguradoras P&I y CASCO & MAQUINARIA, y mejores prácticas de la industria para inspección y elaboración de informes.",
      standards: ["ISO 9001:2015", "IMO SOLAS/MARPOL/MLC", "Estado de Bandera", "Sociedades de Clasificación", "P&I y CASCO & MAQUINARIA"],
    },
    team: {
      title: "Nuestro Equipo",
      subtitle: "Expertos certificados con experiencia global",
      description:
        "Nuestros Inspectores y consultores son profesionales certificados en las áreas de arquitectura naval, ingeniería marítima, operaciones portuarias, ciencias náuticas y derecho marítimo.",
      roles: [
        "Arquitectos Navales",
        "Ingenieros Marítimos",
        "Capitanes de Altura",
        "Abogados Marítimos",
        "Operadores Portuarios",
      ],
    },
    why_choose_us: {
      title: "Por Qué Elegirnos",
      items: [
        "Verificación independiente de tercera parte",
        "Respuesta rápida y disponibilidad 24/7",
        "Informes imparciales aceptados por las partes interesadas",
        "Herramientas modernas",
        "Profundo conocimiento de la industria y experiencia regional",
      ],
    },
    statsBanner: {
      headline: "Cuidado en el Mar. Confianza en Tierra.",
      description:
        "Nuestra red global de servicios está desarrollada para nuestros clientes. Al centrarnos en brindar el mejor servicio de su clase a nuestros clientes, siempre estamos disponibles para ayudarte con tus necesidades particulares y ofrecerte una solución integral para tu próxima solicitud de inspección marítima.",
      cta: "Más información sobre MSC",
      stats: [
        {
          value: "+480",
          label: "Servicios Técnicos",
          description: "Proyectos e inspecciones completadas desde 2019",
        },
        {
          value: "+120",
          label: "Clientes Corporativos",
          description: "Armadores, operadores, aseguradoras y empresas logísticas",
        },
        {
          value: "78%",
          label: "Tasa de Recurrencia",
          description: "De nuestros clientes repiten servicios con nosotros",
        },
        {
          value: "95%",
          label: "Satisfacción del Cliente",
          description: "Según retroalimentación post-servicio",
        },
      ],
    },
    gallery: {
      title: "Galería Multimedia",
      subtitle: "Nuestras operaciones en campo",
    },
    blog: {
      title: "Noticias y Publicaciones",
      subtitle: "Actualidad marítima y normativa",
      empty: "Próximamente: Artículos técnicos y noticias de la industria.",
    },
    contact: {
      title: "Ponte en Contacto",
      subtitle: "Soporte global y respuesta rápida",
      form: {
        name: "Nombre Completo",
        phone: "Teléfono",
        company: "Empresa",
        type: "Tipo de Inspección",
        location: "Puerto / Ubicación",
        date: "Fecha Requerida",
        message: "Mensaje",
        submit: "Enviar Solicitud",
      },
      info: {
        email: "msc@mscsurveyors.org",
        phone: "(+507) 2636601",
        address: "Altos de Curundu, Calle River, Edificio 569B, Ancón, Panamá, República de Panamá",
        emergency: "Línea de Emergencia 24/7: (+507) 65980679",
      },
    },
    footer: {
      brand_quote: "Cuidado en el Mar. Confianza en Tierra.",
      disclaimer: {
        title: "Aviso Legal",
        text: "Marine Surveyors & Consultants (MSC) proporciona la información de este sitio web únicamente con fines informativos generales. No constituye asesoría legal o técnica formal. Regido por las leyes de la República de Panamá.",
      },
      privacy: {
        title: "Privacidad (Ley 81)",
        text: "Comprometidos con la Ley 81 de 2019 de Protección de Datos Personales de Panamá. Sus datos son tratados con estricta confidencialidad y seguridad.",
      },
      rights: "© 2025 MSC – Marine Surveyors & Consultants. Todos los derechos reservados.",
      links: {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        quality: "Calidad",
        team: "Equipo",
        gallery: "Galería",
        blog: "Noticias",
        contact: "Contacto",
      },
    },
    legal: {
      disclaimer: {
        title: "Aviso Legal del Sitio Web",
        content: "Marine Surveyors & Consultants (MSC) proporciona la información de este sitio web únicamente con fines informativos generales. Aunque MSC se esfuerza por garantizar la exactitud de la información, no ofrece ninguna garantía respecto a la integridad, confiabilidad o idoneidad de los contenidos aquí presentados.\n\nLa información de este sitio no constituye asesoría marítima profesional, guía de inspección ni opinión técnica formal. Todos los servicios oficiales se rigen exclusivamente por contratos escritos celebrados bajo las leyes de la República de Panamá.\n\nMSC no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso de este sitio web. Los enlaces externos se proporcionan únicamente para conveniencia; MSC no asume responsabilidad por el contenido externo.\n\nTodos los logotipos, textos, gráficos, documentos y materiales en este sitio web son propiedad exclusiva de MSC, salvo indicación en contrario. La reproducción o distribución no autorizada está estrictamente prohibida conforme a la legislación panameña de propiedad intelectual.\n\nEl uso de este sitio web constituye la aceptación de este Aviso Legal y de los Términos y Condiciones aplicables.",
      },
      privacy: {
        title: "Política de Privacidad",
        intro: "MSC se compromete a proteger sus datos personales conforme a la Ley 81 de 2019 de Protección de Datos Personales de Panamá, así como estándares internacionales relevantes, incluidos principios del GDPR.",
        sections: {
          information: {
            title: "a. Información que Recopilamos",
            content: "• Nombre, correo electrónico, teléfono, datos de empresa y la información que usted proporciona relacionada con los servicios.\n\n• Dirección IP, detalles del navegador, tipo de dispositivo y páginas visitadas.\n\n• Documentos o información enviada para cotizaciones, inspecciones o comunicaciones.",
          },
          purpose: {
            title: "b. Finalidad del Tratamiento",
            content: "Los datos personales se procesan para responder consultas, preparar cotizaciones, coordinar inspecciones, cumplir obligaciones legales y mejorar los servicios.",
          },
          legalBasis: {
            title: "c. Base Legal según la Ley Panameña",
            content: "• Consentimiento del titular de los datos.\n\n• Necesidad contractual.\n\n• Cumplimiento de obligaciones legales.\n\n• Interés comercial legítimo.",
          },
          sharing: {
            title: "d. Compartición de Datos",
            content: "MSC puede compartir sus datos con inspectores subcontratados, aseguradoras, autoridades legales y proveedores de servicios tecnológicos, estrictamente cuando sea necesario para la ejecución de los servicios.",
          },
          security: {
            title: "e. Seguridad y Retención de Datos",
            content: "MSC aplica medidas razonables administrativas, físicas y tecnológicas en cumplimiento con la Ley 81. Los datos se conservan únicamente por el tiempo requerido por normativa comercial, marítima o tributaria panameña.",
          },
          rights: {
            title: "f. Sus Derechos (Ley 81)",
            content: "Según la ley panameña, usted puede solicitar acceso, rectificación, eliminación, portabilidad o restricción del tratamiento de sus datos personales. Las solicitudes pueden enviarse mediante nuestra página de contacto o correo electrónico.",
          },
          contact: {
            title: "g. Contacto para Asuntos de Privacidad",
            content: "Para asuntos relacionados con privacidad: msc@mscsurveyors.org",
          },
        },
      },
      terms: {
        title: "Términos y Condiciones",
        sections: {
          acceptance: {
            title: "a. Aceptación de los Términos",
            content: "Al acceder a este sitio web, usted acepta cumplir con estos Términos y Condiciones, los cuales se rigen por las leyes de la República de Panamá.",
          },
          use: {
            title: "b. Uso del Sitio Web",
            content: "Usted se compromete a no interrumpir ni hacer un uso indebido del sitio web y a no reproducir ni distribuir su contenido sin autorización escrita de MSC.",
          },
          services: {
            title: "c. Servicios Profesionales",
            content: "La información contenida en este sitio es únicamente de referencia general.\n\nTodos los servicios profesionales se prestan exclusivamente mediante contratos escritos regidos por la legislación marítima, comercial y civil panameña.",
          },
          intellectual: {
            title: "d. Propiedad Intelectual",
            content: "Todo el contenido está protegido bajo la Ley 64 de 2012 (Derechos de Autor) y demás regulaciones panameñas aplicables.",
          },
          liability: {
            title: "e. Limitación de Responsabilidad",
            content: "MSC no es responsable por pérdidas ocasionadas por errores del sitio web, interrupciones del servicio, virus o la confianza depositada en el contenido mostrado.",
          },
          jurisdiction: {
            title: "f. Ley Aplicable y Jurisdicción",
            content: "Cualquier disputa será regida por las leyes de la República de Panamá.\n\nLa jurisdicción exclusiva corresponde a los tribunales competentes de la Ciudad de Panamá, Panamá.",
          },
        },
      },
      cookies: {
        title: "Política de Cookies",
        intro: "MSC utiliza cookies de acuerdo con las mejores prácticas internacionales y los estándares de protección al consumidor de Panamá.",
        sections: {
          types: {
            title: "a. Tipos de Cookies",
            content: "• Cookies Esenciales: Funcionamiento básico del sitio.\n\n• Cookies Analíticas: Estadísticas de uso anónimas.\n\n• Cookies Funcionales: Mejoran la experiencia de navegación.",
          },
          management: {
            title: "b. Gestión de Cookies",
            content: "Los usuarios pueden desactivar las cookies desde la configuración del navegador; sin embargo, ciertas funciones del sitio pueden dejar de estar disponibles.",
          },
        },
      },
      legalNotice: {
        title: "Aviso Legal",
        company: {
          title: "a. Aviso Legal – Panamá",
          name: "Marine Surveyors & Consultants (MSC)",
          registration: "Entidad Comercial Registrada – República de Panamá",
          ruc: "RUC: 155675244-2-2019 DV: 20",
        },
        office: {
          title: "b. Oficina Registrada",
          address: "Altos de Curundu, Calle River, Edificio 569B, Ancón, Panamá, República de Panamá",
        },
        contact: {
          title: "c. Contacto Autorizado",
          email: "Correo: msc@mscsurveyors.org",
          phone: "Teléfono: (+507) 2636601",
          website: "Sitio web: www.mscsurveyors.org",
        },
        compliance: {
          title: "d. Cumplimiento Regulatorio",
          content: "MSC opera en cumplimiento con la legislación marítima, comercial y de protección de datos aplicable en Panamá, incluyendo el marco regulatorio de la Autoridad Marítima de Panamá (AMP) cuando corresponda.",
        },
        intellectual: {
          title: "Derechos de Propiedad Intelectual",
          content: "Todo el contenido está protegido por leyes de derechos de autor panameñas e internacionales.",
        },
        jurisdiction: {
          title: "Jurisdicción",
          content: "Cualquier asunto legal relacionado con este sitio web se resolverá exclusivamente ante los tribunales de la Ciudad de Panamá, República de Panamá.",
        },
      },
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      quality: "Quality",
      contact: "Contact",
      request: "Request Survey",
    },
    hero: {
      title: "Independent Marine Surveys You Can Trust.",
      subtitle: "Excellence You Can Depend On.",
      description:
        "We perform independent surveys, cargo inspections, vessel assessments, and technical consultancy for shipowners, charterers, insurers, and port operators worldwide.",
      ctaPrimary: "Request Survey",
      ctaSecondary: "24/7 Support",
      highlights: [
        "Objective Third-Party Reports",
        "Rapid Global Response",
        "Certified Professionals",
        "IMO/ISO Aligned",
      ],
    },
    about: {
      title: "About Us",
      description:
        "Independent organization specializing in comprehensive vessel, cargo, and maritime infrastructure inspections.",
      mission: {
        title: "Mission",
        text: "To provide objective, reliable, and complete third-party marine surveys and maritime consultancy that support safe navigation, protect the value of vessels or naval artifacts, and ensure regulatory compliance. We achieve this through highly qualified professionals, advanced inspection methodologies, and an unwavering commitment to transparency, impartiality, and exceptional customer service.",
      },
      vision: {
        title: "Vision",
        text: "To be the most trusted and globally recognized independent marine survey organization, delivering unwavering precision, integrity, and technical excellence to safeguard maritime operations, vessels or naval artifacts, and the environment.",
      },
      values: [
        {
          title: "Integrity & Impartiality",
          description: "We maintain the highest ethical standards in all our assessments, ensuring objectivity and transparency in every report we deliver.",
        },
        {
          title: "Technical Excellence",
          description: "Our certified professionals apply advanced methodologies and specialized knowledge to provide accurate and reliable assessments.",
        },
        {
          title: "Safety & Compliance",
          description: "We ensure strict compliance with international regulations (IMO, ISO, SOLAS, MARPOL) to protect lives, assets, and the marine environment.",
        },
        {
          title: "Professionalism & Responsibility",
          description: "Every inspection is conducted with maximum professional rigor, taking responsibility for our assessments and technical recommendations.",
        },
        {
          title: "Client-Focused Service",
          description: "We prioritize our clients' needs, offering personalized solutions and exceptional service in every interaction.",
        },
        {
          title: "Innovation & Continuous Improvement",
          description: "We incorporate cutting-edge technology, such as drone inspections, and continuously improve our processes to deliver the best service.",
        },
        {
          title: "Environmental Protection",
          description: "Committed to maritime sustainability, our assessments consider environmental impact and promote responsible practices.",
        },
      ],
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive solutions for the maritime industry",
      items: [
        {
          title: "Vessel Surveys",
          desc: "Pre-purchase surveys, condition and class-related inspections, on/off-hire and bunker surveys, damage and casualty surveys, and P&I inspections.",
          icon: "Ship",
          type: "vessel",
          image: "/images/footage/IMG_20181207_111709.webp",
        },
        {
          title: "Cargo Surveys",
          desc: "Pre-loading & discharge surveys, cargo damage assessment, loading and discharging supervision, breakbulk, bulk, and container evaluations, draft surveys, and tally services.",
          icon: "Container",
          type: "cargo",
          image: "/images/footage/IMG_20190405_150150.webp",
        },
        {
          title: "Marine Consultancy",
          desc: "ISM/ISPS/MLC audits and inspections, technical advisory, marine incident investigation, and regulatory compliance consulting.",
          icon: "Briefcase",
          type: "consultancy",
          image: "/images/footage/IMG_20190406_095637.webp",
        },
        {
          title: "Port & Terminal",
          desc: "Terminal condition assessments and berth and mooring surveys.",
          icon: "Anchor",
          type: "port",
          image: "/images/footage/IMG_20190406_172726.webp",
        },
        {
          title: "Specialized Services",
          desc: "Drone aerial surveys for hard-to-access vessel areas.",
          icon: "Drone",
          type: "specialized",
          image: "/images/footage/IMG_20190506_163718.webp",
        },
      ],
    },
    compliance: {
      title: "Quality & Compliance",
      text: "All operations aligned with ISO 9001:2015, IMO Conventions (SOLAS, MARPOL, MLC, etc.), Flag State Requirements, Classification Society Rules, P&I and HULL & MACHINERY insurer guidelines, and industry best practices for inspection and reporting.",
      standards: ["ISO 9001:2015", "IMO SOLAS/MARPOL/MLC", "Flag State", "Classification Societies", "P&I and HULL & MACHINERY"],
    },
    team: {
      title: "Our Team",
      subtitle: "Certified experts with global experience",
      description:
        "Our Surveyors and consultants are certified professionals in naval architecture, marine engineering, port operations, nautical sciences, and maritime law.",
      roles: ["Naval Architects", "Marine Engineers", "Master Mariners", "Maritime Lawyers", "Port Operators"],
    },
    why_choose_us: {
      title: "Why Choose Us",
      items: [
        "Independent third-party verification",
        "Rapid response and 24/7 availability",
        "Impartial reports accepted by stakeholders",
        "Modern tools",
        "Deep industry knowledge and regional experience",
      ],
    },
    statsBanner: {
      headline: "Care at Sea. Trust on Land.",
      description:
        "Our global service network is developed for our clients. By focusing on providing the best-in-class service to our clients, we are always available to help you with your particular needs and offer you a comprehensive solution for your next maritime inspection request.",
      cta: "More information about MSC",
      stats: [
        {
          value: "+480",
          label: "Technical Services",
          description: "Projects and inspections completed since 2019",
        },
        {
          value: "+120",
          label: "Corporate Clients",
          description: "Shipowners, operators, insurers, and logistics companies",
        },
        {
          value: "78%",
          label: "Recurrence Rate",
          description: "Of our clients repeat services with us",
        },
        {
          value: "95%",
          label: "Client Satisfaction",
          description: "Based on post-service feedback",
        },
      ],
    },
    gallery: {
      title: "Multimedia Gallery",
      subtitle: "Our operations in the field",
    },
    blog: {
      title: "News & Insights",
      subtitle: "Maritime updates and regulations",
      empty: "Coming Soon: Technical articles and industry news.",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Global support and rapid response",
      form: {
        name: "Full Name",
        phone: "Phone Number",
        company: "Company",
        type: "Inspection Type",
        location: "Port / Location",
        date: "Required Date",
        message: "Message",
        submit: "Send Request",
      },
      info: {
        email: "msc@mscsurveyors.org",
        phone: "(+507) 2636601",
        address: "Altos de Curundu, Calle River, Bldg 569B, Ancon, Panama, Republic of Panama",
        emergency: "24/7 Emergency Line: (+507) 65980679",
      },
    },
    footer: {
      brand_quote: "Care at Sea. Confidence on Shore.",
      disclaimer: {
        title: "Legal Disclaimer",
        text: "MSC provides information for general purposes only. No formal technical opinion implied. Governed by the laws of the Republic of Panama.",
      },
      privacy: {
        title: "Privacy (Law 81)",
        text: "Committed to Panama's Law 81 of 2019 on Personal Data Protection. Your data is treated with strict confidentiality and security.",
      },
      rights: "© 2025 MSC – Marine Surveyors & Consultants. All rights reserved.",
      links: {
        home: "Home",
        about: "About Us",
        services: "Services",
        quality: "Quality",
        team: "Team",
        gallery: "Gallery",
        blog: "News",
        contact: "Contact",
      },
    },
    legal: {
      disclaimer: {
        title: "Website Disclaimer",
        content: "Marine Surveyors & Consultants (MSC) provides the information on this website solely for general informational purposes. Although MSC strives to ensure the accuracy of the information, it makes no warranty regarding the completeness, reliability, or suitability of the content presented herein.\n\nThe information on this site does not constitute professional maritime advice, inspection guidance, or formal technical opinion. All official services are governed exclusively by written contracts entered into under the laws of the Republic of Panama.\n\nMSC shall not be liable for direct, indirect, incidental, or consequential damages arising from the use of this website. External links are provided for convenience only; MSC assumes no responsibility for external content.\n\nAll logos, text, graphics, documents, and materials on this website are the exclusive property of MSC, unless otherwise indicated. Unauthorized reproduction or distribution is strictly prohibited in accordance with Panamanian intellectual property legislation.\n\nThe use of this website constitutes acceptance of this Legal Notice and the applicable Terms and Conditions.",
      },
      privacy: {
        title: "Privacy Policy",
        intro: "MSC is committed to protecting your personal data in accordance with Law 81 of 2019 on Personal Data Protection of Panama, as well as relevant international standards, including GDPR principles.",
        sections: {
          information: {
            title: "a. Information We Collect",
            content: "• Name, email, phone, company data, and information you provide related to services.\n\n• IP address, browser details, device type, and pages visited.\n\n• Documents or information submitted for quotes, inspections, or communications.",
          },
          purpose: {
            title: "b. Purpose of Processing",
            content: "Personal data is processed to respond to inquiries, prepare quotes, coordinate inspections, fulfill legal obligations, and improve services.",
          },
          legalBasis: {
            title: "c. Legal Basis under Panamanian Law",
            content: "• Consent of the data subject.\n\n• Contractual necessity.\n\n• Compliance with legal obligations.\n\n• Legitimate commercial interest.",
          },
          sharing: {
            title: "d. Data Sharing",
            content: "MSC may share your data with subcontracted surveyors, insurers, legal authorities, and technology service providers, strictly when necessary for service execution.",
          },
          security: {
            title: "e. Data Security and Retention",
            content: "MSC applies reasonable administrative, physical, and technological measures in compliance with Law 81. Data is retained only for the time required by Panamanian commercial, maritime, or tax regulations.",
          },
          rights: {
            title: "f. Your Rights (Law 81)",
            content: "Under Panamanian law, you may request access, rectification, deletion, portability, or restriction of processing of your personal data. Requests may be submitted through our contact page or email.",
          },
          contact: {
            title: "g. Contact for Privacy Matters",
            content: "For privacy-related matters: msc@mscsurveyors.org",
          },
        },
      },
      terms: {
        title: "Terms & Conditions",
        sections: {
          acceptance: {
            title: "a. Acceptance of Terms",
            content: "By accessing this website, you agree to comply with these Terms and Conditions, which are governed by the laws of the Republic of Panama.",
          },
          use: {
            title: "b. Use of the Website",
            content: "You agree not to disrupt or misuse the website and not to reproduce or distribute its content without written authorization from MSC.",
          },
          services: {
            title: "c. Professional Services",
            content: "The information contained on this site is for general reference only.\n\nAll professional services are provided exclusively through written contracts governed by Panamanian maritime, commercial, and civil legislation.",
          },
          intellectual: {
            title: "d. Intellectual Property",
            content: "All content is protected under Law 64 of 2012 (Copyright) and other applicable Panamanian regulations.",
          },
          liability: {
            title: "e. Limitation of Liability",
            content: "MSC is not responsible for losses caused by website errors, service interruptions, viruses, or reliance on the displayed content.",
          },
          jurisdiction: {
            title: "f. Governing Law & Jurisdiction",
            content: "Any dispute shall be governed by the laws of the Republic of Panama.\n\nExclusive jurisdiction lies with the competent courts of Panama City, Panama.",
          },
        },
      },
      cookies: {
        title: "Cookie Policy",
        intro: "MSC uses cookies in accordance with international best practices and Panamanian consumer protection standards.",
        sections: {
          types: {
            title: "a. Types of Cookies",
            content: "• Essential Cookies: Basic site functionality.\n\n• Analytical Cookies: Anonymous usage statistics.\n\n• Functional Cookies: Enhance browsing experience.",
          },
          management: {
            title: "b. Managing Cookies",
            content: "Users may disable cookies from browser settings; however, certain site functions may become unavailable.",
          },
        },
      },
      legalNotice: {
        title: "Legal Notice",
        company: {
          title: "a. Legal Notice – Panama",
          name: "Marine Surveyors & Consultants (MSC)",
          registration: "Registered Commercial Entity – Republic of Panama",
          ruc: "RUC: 155675244-2-2019 DV: 20",
        },
        office: {
          title: "b. Registered Office",
          address: "Altos de Curundu, Calle River, Bldg 569B, Ancon, Panama, Republic of Panama",
        },
        contact: {
          title: "c. Authorized Contact",
          email: "Email: msc@mscsurveyors.org",
          phone: "Phone: (+507) 2636601",
          website: "Website: www.mscsurveyors.org",
        },
        compliance: {
          title: "d. Regulatory Compliance",
          content: "MSC operates in compliance with applicable maritime, commercial, and data protection legislation in Panama, including the regulatory framework of the Panama Maritime Authority (AMP) when applicable.",
        },
        intellectual: {
          title: "Intellectual Property Rights",
          content: "All content is protected by Panamanian and international copyright laws.",
        },
        jurisdiction: {
          title: "Jurisdiction",
          content: "Any legal matter related to this website shall be resolved exclusively before the courts of Panama City, Republic of Panama.",
        },
      },
    },
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      services: "服务",
      quality: "质量",
      contact: "联系我们",
      request: "申请检验",
    },
    hero: {
      title: "值得信赖的独立海事检验。",
      subtitle: "您可以依靠的卓越品质。",
      description:
        "我们为全球船东、租船人、保险公司和港口运营商提供独立检验、货物检查、船舶评估和技术咨询服务。",
      ctaPrimary: "申请检验",
      ctaSecondary: "24/7全天候支持",
      highlights: [
        "客观的第三方报告",
        "快速全球响应",
        "认证专业人员",
        "符合IMO/ISO标准",
      ],
    },
    about: {
      title: "关于我们",
      description:
        "专业从事船舶、货物和海事基础设施综合检验的独立机构。",
      mission: {
        title: "使命",
        text: "提供客观、可靠、全面的第三方海事检验和海事咨询服务，支持安全航行，保护船舶或海事设施的价值，确保法规合规。我们通过高素质的专业人员、先进的检验方法以及对透明度、公正性和卓越客户服务的坚定承诺来实现这一目标。",
      },
      vision: {
        title: "愿景",
        text: "成为最受信赖和全球认可的独立海事检验机构，以坚定的精确性、诚信和技术卓越来保障海事运营、船舶或海事设施以及环境。",
      },
      values: [
        {
          title: "诚信与公正",
          description: "我们在所有评估中保持最高的道德标准，确保每份报告的客观性和透明度。",
        },
        {
          title: "技术卓越",
          description: "我们的认证专业人员应用先进的方法和专业知识，提供准确可靠的评估。",
        },
        {
          title: "安全与合规",
          description: "我们确保严格遵守国际法规（IMO、ISO、SOLAS、MARPOL），保护生命、资产和海洋环境。",
        },
        {
          title: "专业与责任",
          description: "每次检验都以最高的专业水准进行，对我们的评估和技术建议负责。",
        },
        {
          title: "以客户为中心",
          description: "我们优先考虑客户需求，在每次互动中提供个性化解决方案和卓越服务。",
        },
        {
          title: "创新与持续改进",
          description: "我们采用无人机检验等尖端技术，不断改进流程以提供最佳服务。",
        },
        {
          title: "环境保护",
          description: "致力于海事可持续发展，我们的评估考虑环境影响并推广负责任的做法。",
        },
      ],
    },
    services: {
      title: "我们的服务",
      subtitle: "海事行业的综合解决方案",
      items: [
        {
          title: "船舶检验",
          desc: "购前检验、状况和船级相关检验、租入/租出和燃油检验、损坏和事故检验以及P&I检验。",
          icon: "Ship",
          type: "vessel",
          image: "/images/footage/IMG_20181207_111709.webp",
        },
        {
          title: "货物检验",
          desc: "装货前和卸货检验、货物损坏评估、装卸监督、散杂货和集装箱评估、水尺检验和计数服务。",
          icon: "Container",
          type: "cargo",
          image: "/images/footage/IMG_20190405_150150.webp",
        },
        {
          title: "海事咨询",
          desc: "ISM/ISPS/MLC审核和检验、技术咨询、海事事故调查和法规合规咨询。",
          icon: "Briefcase",
          type: "consultancy",
          image: "/images/footage/IMG_20190406_095637.webp",
        },
        {
          title: "港口与码头",
          desc: "码头状况评估和泊位系泊检验。",
          icon: "Anchor",
          type: "port",
          image: "/images/footage/IMG_20190406_172726.webp",
        },
        {
          title: "专业服务",
          desc: "针对船舶难以到达区域的无人机航空检验。",
          icon: "Drone",
          type: "specialized",
          image: "/images/footage/IMG_20190506_163718.webp",
        },
      ],
    },
    compliance: {
      title: "质量与合规",
      text: "所有运营均符合ISO 9001:2015、IMO公约（SOLAS、MARPOL、MLC等）、船旗国要求、船级社规则、P&I和船体机械保险公司指南以及检验和报告的行业最佳实践。",
      standards: ["ISO 9001:2015", "IMO SOLAS/MARPOL/MLC", "船旗国", "船级社", "P&I和船体机械"],
    },
    team: {
      title: "我们的团队",
      subtitle: "具有全球经验的认证专家",
      description:
        "我们的检验师和顾问是造船、轮机工程、港口运营、航海科学和海事法律领域的认证专业人员。",
      roles: ["造船工程师", "轮机工程师", "船长", "海事律师", "港口运营商"],
    },
    why_choose_us: {
      title: "为什么选择我们",
      items: [
        "独立第三方验证",
        "快速响应和24/7全天候服务",
        "被利益相关方接受的公正报告",
        "现代化工具",
        "深厚的行业知识和区域经验",
      ],
    },
    statsBanner: {
      headline: "海上关怀，陆上信赖。",
      description:
        "我们的全球服务网络是为客户开发的。通过专注于为客户提供一流的服务，我们随时准备帮助您满足特定需求，并为您的下一个海事检验请求提供全面的解决方案。",
      cta: "了解更多关于MSC",
      stats: [
        {
          value: "+480",
          label: "技术服务",
          description: "自2019年以来完成的项目和检验",
        },
        {
          value: "+120",
          label: "企业客户",
          description: "船东、运营商、保险公司和物流公司",
        },
        {
          value: "78%",
          label: "回头率",
          description: "客户重复使用我们的服务",
        },
        {
          value: "95%",
          label: "客户满意度",
          description: "基于服务后反馈",
        },
      ],
    },
    gallery: {
      title: "多媒体画廊",
      subtitle: "我们的现场作业",
    },
    blog: {
      title: "新闻与洞察",
      subtitle: "海事动态和法规更新",
      empty: "即将推出：技术文章和行业新闻。",
    },
    contact: {
      title: "联系我们",
      subtitle: "全球支持和快速响应",
      form: {
        name: "姓名",
        phone: "电话号码",
        company: "公司",
        type: "检验类型",
        location: "港口/位置",
        date: "所需日期",
        message: "留言",
        submit: "提交请求",
      },
      info: {
        email: "msc@mscsurveyors.org",
        phone: "(+507) 2636601",
        address: "巴拿马共和国，巴拿马市，安孔，河街，库伦杜高地，569B号楼",
        emergency: "24/7紧急热线: (+507) 65980679",
      },
    },
    footer: {
      brand_quote: "海上关怀，陆上信赖。",
      disclaimer: {
        title: "法律声明",
        text: "MSC提供的信息仅供一般参考。不构成正式技术意见。受巴拿马共和国法律管辖。",
      },
      privacy: {
        title: "隐私（第81号法）",
        text: "遵守巴拿马2019年第81号个人数据保护法。您的数据将被严格保密和安全处理。",
      },
      rights: "© 2025 MSC – 海事检验与顾问。保留所有权利。",
      links: {
        home: "首页",
        about: "关于我们",
        services: "服务",
        quality: "质量",
        team: "团队",
        gallery: "画廊",
        blog: "新闻",
        contact: "联系",
      },
    },
    legal: {
      disclaimer: {
        title: "网站免责声明",
        content: "海事检验与顾问（MSC）在本网站提供的信息仅供一般参考。尽管MSC努力确保信息的准确性，但不对本网站内容的完整性、可靠性或适用性作任何保证。\n\n本网站的信息不构成专业海事建议、检验指南或正式技术意见。所有正式服务均受巴拿马共和国法律管辖的书面合同约束。\n\nMSC不对因使用本网站而产生的直接、间接、附带或后果性损害承担责任。外部链接仅供方便使用；MSC对外部内容不承担责任。\n\n本网站上的所有标志、文本、图形、文件和材料均为MSC的专有财产，除非另有说明。根据巴拿马知识产权法，未经授权的复制或分发严格禁止。\n\n使用本网站即表示接受本法律声明和适用的条款与条件。",
      },
      privacy: {
        title: "隐私政策",
        intro: "MSC承诺根据巴拿马2019年第81号个人数据保护法以及相关国际标准（包括GDPR原则）保护您的个人数据。",
        sections: {
          information: {
            title: "a. 我们收集的信息",
            content: "• 姓名、电子邮件、电话、公司数据以及您提供的与服务相关的信息。\n\n• IP地址、浏览器详细信息、设备类型和访问页面。\n\n• 为报价、检验或通信提交的文件或信息。",
          },
          purpose: {
            title: "b. 处理目的",
            content: "个人数据用于响应查询、准备报价、协调检验、履行法律义务和改进服务。",
          },
          legalBasis: {
            title: "c. 巴拿马法律下的法律依据",
            content: "• 数据主体的同意。\n\n• 合同必要性。\n\n• 法律义务的遵守。\n\n• 合法商业利益。",
          },
          sharing: {
            title: "d. 数据共享",
            content: "MSC可能与分包检验师、保险公司、法律机构和技术服务提供商共享您的数据，仅在服务执行需要时严格进行。",
          },
          security: {
            title: "e. 数据安全和保留",
            content: "MSC根据第81号法应用合理的行政、物理和技术措施。数据仅在巴拿马商业、海事或税务法规要求的时间内保留。",
          },
          rights: {
            title: "f. 您的权利（第81号法）",
            content: "根据巴拿马法律，您可以请求访问、更正、删除、可移植性或限制处理您的个人数据。请求可通过我们的联系页面或电子邮件提交。",
          },
          contact: {
            title: "g. 隐私事务联系",
            content: "隐私相关事宜请联系：msc@mscsurveyors.org",
          },
        },
      },
      terms: {
        title: "条款与条件",
        sections: {
          acceptance: {
            title: "a. 接受条款",
            content: "访问本网站即表示您同意遵守这些条款与条件，这些条款受巴拿马共和国法律管辖。",
          },
          use: {
            title: "b. 网站使用",
            content: "您同意不干扰或滥用本网站，未经MSC书面授权不得复制或分发其内容。",
          },
          services: {
            title: "c. 专业服务",
            content: "本网站包含的信息仅供一般参考。\n\n所有专业服务均通过受巴拿马海事、商业和民事法律管辖的书面合同提供。",
          },
          intellectual: {
            title: "d. 知识产权",
            content: "所有内容受2012年第64号法（版权法）和其他适用的巴拿马法规保护。",
          },
          liability: {
            title: "e. 责任限制",
            content: "MSC不对因网站错误、服务中断、病毒或对显示内容的依赖而造成的损失负责。",
          },
          jurisdiction: {
            title: "f. 适用法律与管辖权",
            content: "任何争议均受巴拿马共和国法律管辖。\n\n专属管辖权属于巴拿马城的主管法院。",
          },
        },
      },
      cookies: {
        title: "Cookie政策",
        intro: "MSC根据国际最佳实践和巴拿马消费者保护标准使用Cookie。",
        sections: {
          types: {
            title: "a. Cookie类型",
            content: "• 必要Cookie：基本网站功能。\n\n• 分析Cookie：匿名使用统计。\n\n• 功能Cookie：增强浏览体验。",
          },
          management: {
            title: "b. 管理Cookie",
            content: "用户可以从浏览器设置中禁用Cookie；但是，某些网站功能可能会变得不可用。",
          },
        },
      },
      legalNotice: {
        title: "法律声明",
        company: {
          title: "a. 法律声明 – 巴拿马",
          name: "海事检验与顾问（MSC）",
          registration: "注册商业实体 – 巴拿马共和国",
          ruc: "RUC: 155675244-2-2019 DV: 20",
        },
        office: {
          title: "b. 注册办公室",
          address: "巴拿马共和国，巴拿马市，安孔，河街，库伦杜高地，569B号楼",
        },
        contact: {
          title: "c. 授权联系人",
          email: "电子邮件: msc@mscsurveyors.org",
          phone: "电话: (+507) 2636601",
          website: "网站: www.mscsurveyors.org",
        },
        compliance: {
          title: "d. 法规合规",
          content: "MSC遵守巴拿马适用的海事、商业和数据保护法规运营，包括适用时巴拿马海事管理局（AMP）的监管框架。",
        },
        intellectual: {
          title: "知识产权",
          content: "所有内容受巴拿马和国际版权法保护。",
        },
        jurisdiction: {
          title: "管辖权",
          content: "与本网站相关的任何法律事务均应在巴拿马共和国巴拿马城的法院独家解决。",
        },
      },
    },
  },
}
