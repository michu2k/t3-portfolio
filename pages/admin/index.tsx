import {type NextPage} from "next";
import Head from "next/head";

import {Line} from "~/components/generics/Line";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>T3 Portfolio: Manage</title>
      </Head>

      <main className="mx-auto min-h-full">
        Admin panel
        {/*
            - sidebar with section links
            - general section:
                - edit social media icons
            - header section
                - Edit image
                - Edit heading
                - Edit description
                - Edit button text (?)
            - about me section
                - Edit heading
                - Edit description
            - my skills
                - add/edit tags (add, remove, reorder)
            - portfolio
                - edit heading
                - Edit description
                    - add/edit/remove/reorder projects (select image, thumbnail image, name, short description, long description, tags)
            - experience
                - edit heading
                    - add/edit/remove/reorder exp (select heading, company name, job list, start date, due date)
            - contact
                - edit heading
                - edit description
                  - add/edit/remove/reorder contact method (select icon, name, secondary text)

        */}
        <Line />
      </main>
    </>
  );
};

export default Admin;
