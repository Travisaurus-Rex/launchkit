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

export interface TemplateFeature extends Struct.ComponentSchema {
  collectionName: 'components_template_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface TemplateProject extends Struct.ComponentSchema {
  collectionName: 'components_template_projects';
  info: {
    displayName: 'Project';
  };
  attributes: {
    categ: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    projectUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'template.brand': TemplateBrand;
      'template.feature': TemplateFeature;
      'template.hero': TemplateHero;
      'template.project': TemplateProject;
    }
  }
}
