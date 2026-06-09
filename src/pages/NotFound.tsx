import type { NotFoundData } from '../utils/data';

interface NotFoundProps {
  data: NotFoundData;
}

const NotFound = ({ data }: NotFoundProps) => {
  return (
    <div className="flex-content flex--center flex--tall">
      <section className="section section__hero section__hero--page">
        <div className="section__content">
          <div className="xl-card">
            <h1 className="xl-card__title">{data.title}</h1>
            <p>{data.body}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;