import React, { useContext } from 'react';
import { Button, Card, Badge, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const resizeImage = (imageUrl, maxWidth, maxHeight) => {
  // Implement image resizing logic using a library like sharp or jimp
  return imageUrl;
};

const ProjectCard = ({ project }) => {
  const theme = useContext(ThemeContext);

  return (
    <Col>
      <Card
        style={{
          borderRadius: 10,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <div style={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <img
              src={resizeImage(project.image, 400, 225)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              alt={project.title}
            />
          </div>
        </div>
        <Card.Body>
          <Card.Title style={{ fontSize: 24, fontWeight: 700 }}>{project.title}</Card.Title>
          <Card.Text style={{ textAlign: 'left' }}>
            <ReactMarkdown>{project.bodyText}</ReactMarkdown>
          </Card.Text>
        </Card.Body>
        <Card.Body>
          {project?.links?.map((link) => (
            <Button
              key={link.href}
              style={{ margin: 5 }}
              variant={`outline-${theme.bsSecondaryVariant}`}
              onClick={() => window.open(link.href, '_blank')}
            >
              {link.text}
            </Button>
          ))}
        </Card.Body>
        {project.tags && (
          <Card.Footer style={{ backgroundColor: theme.cardFooterBackground }}>
            {project.tags.map((tag) => (
              <Badge key={tag} pill bg={theme.bsSecondaryVariant} text={theme.bsPrimaryVariant} style={{ padding: '5px 10px', margin: 5 }}>
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired, href: PropTypes.string.isRequired })),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;