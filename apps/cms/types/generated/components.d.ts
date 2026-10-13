import type { Schema, Struct } from '@strapi/strapi';

export interface TemplateBrand extends Struct.ComponentSchema {
  collectionName: 'components_template_brands';
  info: {
    displayName: 'Brand';
  };
  attributes: {
    brandName: Schema.Attribute.String & Schema.Attribute.Required;
    primaryColor: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TemplateHero extends Struct.ComponentSchema {
  collectionName: 'components_template_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String & Schema.Attribute.Required;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.Required;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    subheadline: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'template.brand': TemplateBrand;
      'template.hero': TemplateHero;
    }
  }
}
