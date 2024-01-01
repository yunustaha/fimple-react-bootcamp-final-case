import { delay, http, HttpResponse } from "msw";
import { v4 } from "uuid";

const token = "asdfxsaqwertgda9asdfgb";

export const handlers = [
  http.post("/application", async ({ request }) => {
    let data = await request.json();
    data = { id: v4(), answer: "", status: 'false', ...data };

    let newApplications;
    const applications = localStorage.getItem("applications");

    if (!applications) {
      newApplications = [data];
    } else {
      const parsedApplications = JSON.parse(applications);

      newApplications = [...parsedApplications, data];
    }

    localStorage.setItem("applications", JSON.stringify(newApplications));

    return HttpResponse.json(
      { insertId: data.id },
      {
        status: 201,
        statusText: "success",
      },
    );
  }),

  http.get("/application/:id", async ({ params }) => {
    const applications = localStorage.getItem("applications");
    let application;

    if (applications) {
      const parsedApplications = JSON.parse(applications);

      application = parsedApplications.find((item) => item.id === params.id);
    }

    await delay(1000);

    return HttpResponse.json(
      { application },
      {
        status: 200,
        statusText: "success",
      },
    );
  }),

  http.post("/admin/login", async ({ request }) => {
    const data = await request.json();

    if (data.userName === "kodluyoruz" && data.password === "bootcamp109") {
      localStorage.setItem("token", token);
      return HttpResponse.json(
        { token },
        {
          status: 201,
          statusText: "success",
        },
      );
    }
    return HttpResponse.json(null, {
      status: 403,
      statusText: "unauthorized",
    });
  }),

  http.get("/admin/applications", async () => {
    const applications = localStorage.getItem("applications");
    let parsedApplications;

    if (applications) {
      parsedApplications = JSON.parse(applications);
    } else {
      parsedApplications = [];
    }

    await delay(1000);

    return HttpResponse.json(
      { applications: parsedApplications },
      {
        status: 200,
        statusText: "success",
      },
    );
  }),

  http.put("/admin/application/:id", async ({ params, request }) => {
    const body = await request.json();
    const applications = localStorage.getItem("applications");

    if (applications) {
      const parsedApplications = JSON.parse(applications);

      const index = parsedApplications.findIndex(
        (item) => item.id === params.id,
      );

      parsedApplications[index].answer = body.answer;
      parsedApplications[index].status = body.status;

      localStorage.setItem("applications", JSON.stringify(parsedApplications));
    }

    await delay(1000);

    return HttpResponse.json({
      status: 200,
      statusText: "success",
    });
  }),
];
