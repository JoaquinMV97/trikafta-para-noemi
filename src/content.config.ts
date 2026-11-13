import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const proyectos = defineCollection({
    loader: glob({ base: "./src/content/proyectos", pattern: "**/*.md" }),
    schema: ({ image }) => z.object({
        titulo: z.string(),
        tipo: z.enum(["curso", "podcast", "evento", "campaña","música", "otro"]),
        estado: z.enum(["activo", "proximamente"]).default("activo"),
        imagenTipo: z.enum(["foto", "logo"]).default("foto"),
        resumen: z.string().max(160),
        imagen: image().optional(),
        imagenAlt: z.string().optional(),
        enlace: z.url().optional(),
        textoEnlace: z.string().default("Más información"),
        publicado: z.coerce.date(),
        vigenteHasta: z.coerce.date().optional(),
        destacado: z.boolean().default(false),
    }),
});

const comunidad = defineCollection({
    loader: file("src/data/comunidad.json"),
    schema: z.object({
        nombre: z.string(),
        tipo: z.enum(["fundación", "asociación", "grupo", "campaña"]),
        descripcion: z.string(),
        redes: z.object({
            web: z.url().optional(),
            facebook: z.url().optional(),
            instagram: z.url().optional(),
            tiktok: z.url().optional(),
            x: z.url().optional(),
            youtube: z.url().optional(),
        }),
        verificado: z.coerce.date()
    })
});

const paginas = defineCollection({
  loader: glob({ base: "./src/content/paginas", pattern: "**/*.md" }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().max(160),
    eyebrow: z.string().optional(),
    actualizado: z.coerce.date(),
    fuentes: z
      .array(z.object({ titulo: z.string(), url: z.url() }))
      .default([]),
  }),
});

export const collections = { proyectos, comunidad, paginas };
