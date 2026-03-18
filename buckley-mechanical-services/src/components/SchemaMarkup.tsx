import React from 'react';

interface SchemaMarkupProps {
  data: object;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default SchemaMarkup;
