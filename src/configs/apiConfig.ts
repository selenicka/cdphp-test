export const urlAPIStorage: { [key: string]: any; } = {
    alliance: {
        searchPattern: '/alliances/{alliance_id}/',
        requestType: 'get'
    },
    character: {
        searchPattern: '/characters/{character_id}/',
        requestType: 'get'        
    },
    agent: {
        searchPattern: '/characters/{agent_id}/',
        requestType: 'get'
    },
    constellation: {
        searchPattern: '/universe/constellations/{constellation_id}/',
        requestType: 'get'
    },
    corporation: {
        searchPattern: '/corporations/{corporation_id}/',
        requestType: 'get'
    },
    region: {
        searchPattern: '/universe/regions/{region_id}/',
        requestType: 'get'
    },
    'solar_system': {
        searchPattern: '/universe/systems/{solar_system_id}/',
        requestType: 'get'
    },
    station: {
        searchPattern: '/universe/stations/{station_id}/',
        requestType: 'get'
    },
    'inventory_type': {
        searchPattern: '/universe/names/',
        requestType: 'post'
    },
    races: {
        searchPattern: '/universe/races/',
        requestType: 'get'
    }
};