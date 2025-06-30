import { StructureResolver } from 'sanity/structure';
import { StructureBuilder } from 'sanity/structure';

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author')),

      S.listItem()
        .title('Startups')
        .schemaType('startup')
        .child(S.documentTypeList('startup')),
    ]);
