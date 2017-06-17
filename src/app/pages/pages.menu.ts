export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'tables',
        data: {
          menu: {
            title: 'Tables',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'booking',
            data: {
              menu: {
                title: 'Booking',
              }
            }
          },
          {
            path: 'vehicles',
            data: {
              menu: {
                title: 'Vehicles',
              }
            }
          },
          {
            path: 'owners',
            data: {
              menu: {
                title: 'Owners',
              }
            }
          },
          {
            path: 'drivers',
            data: {
              menu: {
                title: 'Drivers',
              }
            }
          },
          /*{
            path: 'routes',
            data: {
              menu: {
                title: 'Routes',
              }
            }
          }*/
        ]
      },
      {
        path: 'maps',
        data: {
          menu: {
            title: 'Maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'Google Maps',
              }
            }
          }
        ]
      },

      {
        path: 'users',
        data: {
          menu: {
            title: 'Users',
            icon: 'ion-android-people',
            selected: false,
            expanded: false,
            order: 700,
            hidden :true
          }
        }
      },
      {
        path: 'servers',
        data: {
          menu: {
            title: 'Servers',
            icon: 'ion-android-globe',
            selected: false,
            expanded: false,
            order: 700,
            hidden :true
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'External Link',
            url: 'http://www.drivool.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
    ]
  }
];
