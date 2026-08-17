import { createBrowserRouter } from "react-router-dom";

import { RootLayout } from "../layouts/RootLayout";
import { AboutPage } from "../pages/AboutPage";
import { EventDetailsPage } from "../pages/EventDetailsPage";
import { EventsPage } from "../pages/EventsPage";
import { HomePage } from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { MyTicketsPage } from "../pages/tickets/MyTicketsPage";
import { TicketDetailsPage } from "../pages/tickets/TicketDetailsPage";
import { MyEventsPage } from "../pages/organizer/MyEventsPage";
import { CreateEventPage } from "../pages/organizer/CreateEventPage";
import { OrganizerEventDetailsPage } from "../pages/organizer/OrganizerEventDetailsPage";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "events",
                element: <EventsPage />,
            },
            {
                path: "events/:eventId",
                element: <EventDetailsPage />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "my-tickets",
                        element: <MyTicketsPage />,
                    },
                    {
                        path: "my-tickets/:ticketId",
                        element: <TicketDetailsPage />,
                    },
                ],
            },
            {
                element: <ProtectedRoute allowedRoles={["ORGANIZER"]} />,
                children: [
                    {
                        path: "my-events",
                        element: <MyEventsPage />,
                    },
                    {
                        path: "my-events/create",
                        element: <CreateEventPage />,
                    },
                    {
                        path: "my-events/:eventId",
                        element: <OrganizerEventDetailsPage />,
                    },
                ],
            },
            {
                path: "about",
                element: <AboutPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
