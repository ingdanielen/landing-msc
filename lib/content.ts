export type Language = "es" | "en"

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
          value: "Equipo",
          label: "Profesionales Certificados",
          description: "Inspectores, arquitectos navales y consultores marítimos altamente calificados",
        },
        {
          value: "Global",
          label: "Cobertura Mundial",
          description: "Servicios disponibles en los principales puertos del mundo",
        },
        {
          value: "100%",
          label: "Cumplimiento Normativo",
          description: "Alineados con IMO, ISO, SOLAS, MARPOL y estándares internacionales",
        },
        {
          value: "24/7",
          label: "Disponibilidad",
          description: "Respuesta rápida y soporte de emergencia en cualquier momento",
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
          value: "Team",
          label: "Certified Professionals",
          description: "Highly qualified inspectors, naval architects and maritime consultants",
        },
        {
          value: "Global",
          label: "Worldwide Coverage",
          description: "Services available in major ports worldwide",
        },
        {
          value: "100%",
          label: "Regulatory Compliance",
          description: "Aligned with IMO, ISO, SOLAS, MARPOL and international standards",
        },
        {
          value: "24/7",
          label: "Availability",
          description: "Rapid response and emergency support at any time",
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
}
