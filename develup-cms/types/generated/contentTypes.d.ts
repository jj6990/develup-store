import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    userId: Attribute.UID;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBillingAddressBillingAddress extends Schema.CollectionType {
  collectionName: 'billing_addresses';
  info: {
    singularName: 'billing-address';
    pluralName: 'billing-addresses';
    displayName: 'Billing Address';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    billingAddressId: Attribute.UID;
    userId: Attribute.Relation<
      'api::billing-address.billing-address',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    addressLine1: Attribute.Text;
    addressLine2: Attribute.Text;
    city: Attribute.String;
    zipCode: Attribute.String;
    countries: Attribute.Enumeration<
      [
        'Afghanistan (AF)',
        'Albania (AL)',
        'Algeria (DZ)',
        'Andorra (AD)',
        'Angola (AO)',
        'Antigua and Barbuda (AG)',
        'Argentina (AR)',
        'Armenia (AM)',
        'Australia (AU)',
        'Austria (AT)',
        'Azerbaijan (AZ)',
        'Bahamas (BS)',
        'Bahrain (BH)',
        'Bangladesh (BD)',
        'Barbados (BB)',
        'Belarus (BY)',
        'Belgium (BE)',
        'Belize (BZ)',
        'Benin (BJ)',
        'Bhutan (BT)',
        'Bolivia (BO)',
        'Bosnia and Herzegovina (BA)',
        'Botswana (BW)',
        'Brazil (BR)',
        'Brunei Darussalam (BN)',
        'Bulgaria (BG)',
        'Burkina Faso (BF)',
        'Burundi (BI)',
        'Cabo Verde (CV)',
        'Cambodia (KH)',
        'Cameroon (CM)',
        'Canada (CA)',
        'Central African Republic (CF)',
        'Chad (TD)',
        'Chile (CL)',
        'China (CN)',
        'Colombia (CO)',
        'Comoros (KM)',
        'Congo (CG)',
        'Costa Rica (CR)',
        'Croatia (HR)',
        'Cuba (CU)',
        'Cyprus (CY)',
        'Czech Republic (CZ)',
        "Democratic People's Republic of Korea (KP)",
        'Democratic Republic of the Congo (CD)',
        'Denmark (DK)',
        'Djibouti (DJ)',
        'Dominica (DM)',
        'Dominican Republic (DO)',
        'Ecuador (EC)',
        'Egypt (EG)',
        'El Salvador (SV)',
        'Equatorial Guinea (GQ)',
        'Eritrea (ER)',
        'Estonia (EE)',
        'Eswatini (SZ)',
        'Ethiopia (ET)',
        'Fiji (FJ)',
        'Finland (FI)',
        'France (FR)',
        'Gabon (GA)',
        'Gambia (GM)',
        'Georgia (GE)',
        'Germany (DE)',
        'Ghana (GH)',
        'Greece (GR)',
        'Grenada (GD)',
        'Guatemala (GT)',
        'Guinea (GN)',
        'Guinea-Bissau (GW)',
        'Guyana (GY)',
        'Haiti (HT)',
        'Honduras (HN)',
        'Hungary (HU)',
        'Iceland (IS)',
        'India (IN)',
        'Indonesia (ID)',
        'Iran (IR)',
        'Iraq (IQ)',
        'Ireland (IE)',
        'Israel (IL)',
        'Italy (IT)',
        'Jamaica (JM)',
        'Japan (JP)',
        'Jordan (JO)',
        'Kazakhstan (KZ)',
        'Kenya (KE)',
        'Kiribati (KI)',
        'Kuwait (KW)',
        'Kyrgyzstan (KG)',
        "Lao People's Democratic Republic (LA)",
        'Latvia (LV)',
        'Lebanon (LB)',
        'Lesotho (LS)',
        'Liberia (LR)',
        'Libya (LY)',
        'Liechtenstein (LI)',
        'Lithuania (LT)',
        'Luxembourg (LU)',
        'Madagascar (MG)',
        'Malawi (MW)',
        'Malaysia (MY)',
        'Maldives (MV)',
        'Mali (ML)',
        'Malta (MT)',
        'Marshall Islands (MH)',
        'Mauritania (MR)',
        'Mauritius (MU)',
        'Mexico (MX)',
        'Micronesia (FM)',
        'Monaco (MC)',
        'Mongolia (MN)',
        'Montenegro (ME)',
        'Morocco (MA)',
        'Mozambique (MZ)',
        'Myanmar (MM)',
        'Namibia (NA)',
        'Nauru (NR)',
        'Nepal (NP)',
        'Netherlands (NL)',
        'New Zealand (NZ)',
        'Nicaragua (NI)',
        'Niger (NE)',
        'Nigeria (NG)',
        'North Macedonia (MK)',
        'Norway (NO)',
        'Oman (OM)',
        'Pakistan (PK)',
        'Palau (PW)',
        'Panama (PA)',
        'Papua New Guinea (PG)',
        'Paraguay (PY)',
        'Peru (PE)',
        'Philippines (PH)',
        'Poland (PL)',
        'Portugal (PT)',
        'Qatar (QA)',
        'Republic of Korea (KR)',
        'Republic of Moldova (MD)',
        'Romania (RO)',
        'Russian Federation (RU)',
        'Rwanda (RW)',
        'Saint Kitts and Nevis (KN)',
        'Saint Lucia (LC)',
        'Saint Vincent and the Grenadines (VC)',
        'Samoa (WS)',
        'San Marino (SM)',
        'Sao Tome and Principe (ST)',
        'Saudi Arabia (SA)',
        'Senegal (SN)',
        'Serbia (RS)',
        'Seychelles (SC)',
        'Sierra Leone (SL)',
        'Singapore (SG)',
        'Slovakia (SK)',
        'Slovenia (SI)',
        'Solomon Islands (SB)',
        'Somalia (SO)',
        'South Africa (ZA)',
        'South Sudan (SS)',
        'Spain (ES)',
        'Sri Lanka (LK)',
        'Sudan (SD)',
        'Suriname (SR)',
        'Sweden (SE)',
        'Switzerland (CH)',
        'Syrian Arab Republic (SY)',
        'Tajikistan (TJ)',
        'Thailand (TH)',
        'Timor-Leste (TL)',
        'Togo (TG)',
        'Tonga (TO)',
        'Trinidad and Tobago (TT)',
        'Tunisia (TN)',
        'Turkey (TR)',
        'Turkmenistan (TM)',
        'Tuvalu (TV)',
        'Uganda (UG)',
        'Ukraine (UA)',
        'United Arab Emirates (AE)',
        'United Kingdom of Great Britain and Northern Ireland (GB)',
        'United Republic of Tanzania (TZ)',
        'United States of America (US)',
        'Uruguay (UY)',
        'Uzbekistan (UZ)',
        'Vanuatu (VU)',
        'Venezuela (VE)',
        'Viet Nam (VN)',
        'Yemen (YE)',
        'Zambia (ZM)',
        'Zimbabwe (ZW)'
      ]
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::billing-address.billing-address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::billing-address.billing-address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Schema.SingleType {
  collectionName: 'home_pages';
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'Home Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Order';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    orderId: Attribute.UID;
    userId: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    orderDate: Attribute.DateTime;
    totalAmount: Attribute.Decimal;
    status: Attribute.Enumeration<
      [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
        'on hold',
        'backordered',
        'refunded',
        'pending payment',
        'partially shipped'
      ]
    >;
    billingAddress: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::billing-address.billing-address'
    >;
    shippingAddress: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::shipping-address.shipping-address'
    >;
    shipping_method: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::shipping-method.shipping-method'
    >;
    payment_method: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::payment-method.payment-method'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrderItemOrderItem extends Schema.CollectionType {
  collectionName: 'order_items';
  info: {
    singularName: 'order-item';
    pluralName: 'order-items';
    displayName: 'Order Item';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    orderItemId: Attribute.UID;
    order: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'api::order.order'
    >;
    productId: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'api::product.product'
    >;
    productVariationId: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'api::product-variation.product-variation'
    >;
    quantity: Attribute.Integer;
    pricePerUnit: Attribute.Decimal;
    totalPrice: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order-item.order-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentMethodPaymentMethod extends Schema.CollectionType {
  collectionName: 'payment_methods';
  info: {
    singularName: 'payment-method';
    pluralName: 'payment-methods';
    displayName: 'Payment Method';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    paymentMethodId: Attribute.UID;
    paymentMethodName: Attribute.String;
    paymentMethodDescription: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    productId: Attribute.UID;
    productName: Attribute.String;
    productDescription: Attribute.Text;
    price: Attribute.Decimal;
    salePrice: Attribute.Decimal;
    productImages: Attribute.Media;
    productCoverImage: Attribute.Media;
    category_ids: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::product-category.product-category'
    >;
    stock: Attribute.Integer;
    hasVariations: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductCategoryProductCategory
  extends Schema.CollectionType {
  collectionName: 'product_categories';
  info: {
    singularName: 'product-category';
    pluralName: 'product-categories';
    displayName: 'Product Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    productCategoryId: Attribute.UID;
    productCategoryName: Attribute.String;
    productCategoryImage: Attribute.Media;
    parentCategory: Attribute.Relation<
      'api::product-category.product-category',
      'oneToOne',
      'api::product-category.product-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-category.product-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-category.product-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductVariationProductVariation
  extends Schema.CollectionType {
  collectionName: 'product_variations';
  info: {
    singularName: 'product-variation';
    pluralName: 'product-variations';
    displayName: 'Product Variation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    productVariationId: Attribute.UID;
    productIds: Attribute.Relation<
      'api::product-variation.product-variation',
      'oneToMany',
      'api::product.product'
    >;
    variationName: Attribute.String;
    price: Attribute.Decimal;
    salePrice: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-variation.product-variation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-variation.product-variation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShippingAddressShippingAddress
  extends Schema.CollectionType {
  collectionName: 'shipping_addresses';
  info: {
    singularName: 'shipping-address';
    pluralName: 'shipping-addresses';
    displayName: 'Shipping Address';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    addressId: Attribute.UID;
    userId: Attribute.Relation<
      'api::shipping-address.shipping-address',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    addressLine1: Attribute.Text;
    addressLine2: Attribute.Text;
    city: Attribute.String;
    zipCode: Attribute.String;
    countries: Attribute.Enumeration<
      [
        'Afghanistan (AF)',
        'Albania (AL)',
        'Algeria (DZ)',
        'Andorra (AD)',
        'Angola (AO)',
        'Antigua and Barbuda (AG)',
        'Argentina (AR)',
        'Armenia (AM)',
        'Australia (AU)',
        'Austria (AT)',
        'Azerbaijan (AZ)',
        'Bahamas (BS)',
        'Bahrain (BH)',
        'Bangladesh (BD)',
        'Barbados (BB)',
        'Belarus (BY)',
        'Belgium (BE)',
        'Belize (BZ)',
        'Benin (BJ)',
        'Bhutan (BT)',
        'Bolivia (BO)',
        'Bosnia and Herzegovina (BA)',
        'Botswana (BW)',
        'Brazil (BR)',
        'Brunei Darussalam (BN)',
        'Bulgaria (BG)',
        'Burkina Faso (BF)',
        'Burundi (BI)',
        'Cabo Verde (CV)',
        'Cambodia (KH)',
        'Cameroon (CM)',
        'Canada (CA)',
        'Central African Republic (CF)',
        'Chad (TD)',
        'Chile (CL)',
        'China (CN)',
        'Colombia (CO)',
        'Comoros (KM)',
        'Congo (CG)',
        'Costa Rica (CR)',
        'Croatia (HR)',
        'Cuba (CU)',
        'Cyprus (CY)',
        'Czech Republic (CZ)',
        "Democratic People's Republic of Korea (KP)",
        'Democratic Republic of the Congo (CD)',
        'Denmark (DK)',
        'Djibouti (DJ)',
        'Dominica (DM)',
        'Dominican Republic (DO)',
        'Ecuador (EC)',
        'Egypt (EG)',
        'El Salvador (SV)',
        'Equatorial Guinea (GQ)',
        'Eritrea (ER)',
        'Estonia (EE)',
        'Eswatini (SZ)',
        'Ethiopia (ET)',
        'Fiji (FJ)',
        'Finland (FI)',
        'France (FR)',
        'Gabon (GA)',
        'Gambia (GM)',
        'Georgia (GE)',
        'Germany (DE)',
        'Ghana (GH)',
        'Greece (GR)',
        'Grenada (GD)',
        'Guatemala (GT)',
        'Guinea (GN)',
        'Guinea-Bissau (GW)',
        'Guyana (GY)',
        'Haiti (HT)',
        'Honduras (HN)',
        'Hungary (HU)',
        'Iceland (IS)',
        'India (IN)',
        'Indonesia (ID)',
        'Iran (IR)',
        'Iraq (IQ)',
        'Ireland (IE)',
        'Israel (IL)',
        'Italy (IT)',
        'Jamaica (JM)',
        'Japan (JP)',
        'Jordan (JO)',
        'Kazakhstan (KZ)',
        'Kenya (KE)',
        'Kiribati (KI)',
        'Kuwait (KW)',
        'Kyrgyzstan (KG)',
        "Lao People's Democratic Republic (LA)",
        'Latvia (LV)',
        'Lebanon (LB)',
        'Lesotho (LS)',
        'Liberia (LR)',
        'Libya (LY)',
        'Liechtenstein (LI)',
        'Lithuania (LT)',
        'Luxembourg (LU)',
        'Madagascar (MG)',
        'Malawi (MW)',
        'Malaysia (MY)',
        'Maldives (MV)',
        'Mali (ML)',
        'Malta (MT)',
        'Marshall Islands (MH)',
        'Mauritania (MR)',
        'Mauritius (MU)',
        'Mexico (MX)',
        'Micronesia (FM)',
        'Monaco (MC)',
        'Mongolia (MN)',
        'Montenegro (ME)',
        'Morocco (MA)',
        'Mozambique (MZ)',
        'Myanmar (MM)',
        'Namibia (NA)',
        'Nauru (NR)',
        'Nepal (NP)',
        'Netherlands (NL)',
        'New Zealand (NZ)',
        'Nicaragua (NI)',
        'Niger (NE)',
        'Nigeria (NG)',
        'North Macedonia (MK)',
        'Norway (NO)',
        'Oman (OM)',
        'Pakistan (PK)',
        'Palau (PW)',
        'Panama (PA)',
        'Papua New Guinea (PG)',
        'Paraguay (PY)',
        'Peru (PE)',
        'Philippines (PH)',
        'Poland (PL)',
        'Portugal (PT)',
        'Qatar (QA)',
        'Republic of Korea (KR)',
        'Republic of Moldova (MD)',
        'Romania (RO)',
        'Russian Federation (RU)',
        'Rwanda (RW)',
        'Saint Kitts and Nevis (KN)',
        'Saint Lucia (LC)',
        'Saint Vincent and the Grenadines (VC)',
        'Samoa (WS)',
        'San Marino (SM)',
        'Sao Tome and Principe (ST)',
        'Saudi Arabia (SA)',
        'Senegal (SN)',
        'Serbia (RS)',
        'Seychelles (SC)',
        'Sierra Leone (SL)',
        'Singapore (SG)',
        'Slovakia (SK)',
        'Slovenia (SI)',
        'Solomon Islands (SB)',
        'Somalia (SO)',
        'South Africa (ZA)',
        'South Sudan (SS)',
        'Spain (ES)',
        'Sri Lanka (LK)',
        'Sudan (SD)',
        'Suriname (SR)',
        'Sweden (SE)',
        'Switzerland (CH)',
        'Syrian Arab Republic (SY)',
        'Tajikistan (TJ)',
        'Thailand (TH)',
        'Timor-Leste (TL)',
        'Togo (TG)',
        'Tonga (TO)',
        'Trinidad and Tobago (TT)',
        'Tunisia (TN)',
        'Turkey (TR)',
        'Turkmenistan (TM)',
        'Tuvalu (TV)',
        'Uganda (UG)',
        'Ukraine (UA)',
        'United Arab Emirates (AE)',
        'United Kingdom of Great Britain and Northern Ireland (GB)',
        'United Republic of Tanzania (TZ)',
        'United States of America (US)',
        'Uruguay (UY)',
        'Uzbekistan (UZ)',
        'Vanuatu (VU)',
        'Venezuela (VE)',
        'Viet Nam (VN)',
        'Yemen (YE)',
        'Zambia (ZM)',
        'Zimbabwe (ZW)'
      ]
    >;
    useAddressForBilling: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shipping-address.shipping-address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shipping-address.shipping-address',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShippingMethodShippingMethod extends Schema.CollectionType {
  collectionName: 'shipping_methods';
  info: {
    singularName: 'shipping-method';
    pluralName: 'shipping-methods';
    displayName: 'Shipping Method';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    shippingMethodId: Attribute.UID;
    shippingMethodName: Attribute.String;
    shippingMethodDescription: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shipping-method.shipping-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shipping-method.shipping-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::billing-address.billing-address': ApiBillingAddressBillingAddress;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::order.order': ApiOrderOrder;
      'api::order-item.order-item': ApiOrderItemOrderItem;
      'api::payment-method.payment-method': ApiPaymentMethodPaymentMethod;
      'api::product.product': ApiProductProduct;
      'api::product-category.product-category': ApiProductCategoryProductCategory;
      'api::product-variation.product-variation': ApiProductVariationProductVariation;
      'api::shipping-address.shipping-address': ApiShippingAddressShippingAddress;
      'api::shipping-method.shipping-method': ApiShippingMethodShippingMethod;
    }
  }
}
