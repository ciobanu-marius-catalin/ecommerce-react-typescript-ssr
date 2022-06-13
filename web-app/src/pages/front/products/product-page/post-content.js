import moment from 'moment';

function PostContent({ data }) {
  const { thumbnail: url, description, title, created_at } = data;
  const dateFormat = moment(created_at).format('MMMM DD, YYYY');
  return (
    <div className="gravity-post-page">
      <div className="px-md-4">
        <div className="gravity-post-page__date">
          {'Published ' + dateFormat}
        </div>

        <h1 className="gravity-post-page__title">{title}</h1>
      </div>

      <div className="gravity-post-page__image__outer">
        <div className="gravity-post-page__image-aspect-ratio">
          <img src={url} alt="featured-image" loading="lazy" />
        </div>
      </div>

      <p className="gravity-post-page__content mx-md-4">{description}</p>
    </div>
  );
}

export { PostContent };
