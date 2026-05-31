export const MAP_POLICY = {
    explore: {
        draggable: true,
        zoomable: true,
        markerResizable: true,
        height: "40.45rem",
        level: 3,
    },

    register: {
        draggable: true,
        zoomable: false,
        markerResizable: false,
        height: "10rem",
        level: 1,
    },

    readonly: {
        draggable: false,
        zoomable: false,
        markerResizable: false,
        height: "10rem",
        level: 1,
    },
} as const;
