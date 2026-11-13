import { getCollection } from "astro:content";

export async function getProyectosVigentes() {
  const hoy = new Date();
  const proyectos = await getCollection(
    "proyectos",
    ({ data }) => !data.vigenteHasta || data.vigenteHasta >= hoy,
  );
  return proyectos.sort(
    (a, b) => b.data.publicado.valueOf() - a.data.publicado.valueOf(),
  );
}