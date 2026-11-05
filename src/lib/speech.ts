/**
 * Retorna a seção atualmente mais visível na janela ou o elemento main.
 */
export function getVisibleSectionText(): string {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[data-readable]'));

  if (sections.length === 0) {
    const main = document.querySelector('main');
    return main?.innerText?.trim() ?? '';
  }

  const viewportCenter = window.innerHeight / 2;
  let bestSection = sections[0];
  let smallestDistance = Number.POSITIVE_INFINITY;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      bestSection = section;
    }
  }

  return bestSection.innerText.replace(/\s+/g, ' ').trim();
}
