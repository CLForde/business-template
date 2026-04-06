type Site = {
  id: string;
  name: string;
  subdomain: string;
};

type Service = {
  id: string;
  title: string;
  description: string;
  price: number | string | null;
};

type PublicSiteViewProps = {
  site: Site;
  services: Service[];
};

export default function PublicSiteView({
  site,
  services,
}: PublicSiteViewProps) {
  return (
    <main style={{ padding: '4rem' }}>
      <h1>{site.name}</h1>
      <p>Welcome to our services page.</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>Our Services</h2>

        {services.length === 0 ? (
          <p>No services available yet.</p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              style={{
                marginTop: '1.5rem',
                padding: '1rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
              }}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>
                {service.price !== null && service.price !== undefined
                  ? `$${service.price}`
                  : 'Price on request'}
              </strong>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
