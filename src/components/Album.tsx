import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useState } from "react";

function Album({ album }: any) {
  const [activeIndex, setActiveIndex] = useState(undefined);

  function getImage(album: any) {
    const image = album.images.filter(
      (i: { height: number }) => i.height === 64
    )[0];
    return image.url;
  }

  console.log("album", album);
  return (
    <Card
      title={album.name}
      subTitle={album.release_date}
      style={{
        width: "300px",
        margin: "5px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Image
          src={getImage(album)}
          alt={album.name}
          style={{ width: 64, height: 64 }}
        ></Image>
        <Accordion
          activeIndex={activeIndex}
          onTabChange={(e: any) => setActiveIndex(e.index)}
          style={{ marginTop: "2rem" }}
        >
          <AccordionTab
            header={`${activeIndex === 0 ? "Cacher" : "Voir"} détails`}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              {`Artiste${
                Array.isArray(album.artists) && album.artists.length > 1
                  ? "s"
                  : ""
              } :`}
              <ul style={{ marginTop: "0.2rem" }}>
                {Array.isArray(album.artists) &&
                  album.artists.map((artist: any, index: number) => (
                    <li key={index}>{artist.name}</li>
                  ))}
              </ul>
              <p>{`Type : ${album.type}`}</p>
            </div>
          </AccordionTab>
        </Accordion>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}></div>
    </Card>
  );
}

export default Album;
