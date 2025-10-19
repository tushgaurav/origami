import sql from '@/db';

// Tables
const createTables = async () => {
    await sql`
    CREATE TABLE IF NOT EXISTS hl_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`;

}

// Dummy Data - Testing Only
const addDummyData = async () => {
    await sql`
    INSERT INTO hl_items (title, url, description, icon) VALUES
    ('Proxmox', 'http://10.1.1.2:8006', 'Proxmox VE is a open source virtualization platform for managing virtual machines and containers.', 'si:proxmox'),
    ('Home Assistant', 'http://10.1.1.2:8123', 'Home Assistant is a open source home automation platform for managing your home.', 'si:home-assistant'),
    ('AdGuard Home', 'http://10.1.1.2:3000', 'AdGuard Home is a open source ad blocker for your home network.', 'si:adguard-home'),
    ('OctoPrint', 'http://10.1.1.2:8080', 'OctoPrint is a open source web interface for managing your 3D printers.', 'si:octoprint'),
    ('n8n', 'http://10.1.1.2:5678', 'n8n is a open source workflow automation platform for managing your home automation.', 'si:n8n'),
    ('Grafana', 'http://10.1.1.2:3000', 'Grafana is a open source monitoring and analytics platform for managing your home network.', 'si:grafana'),
    ('InfluxDB', 'http://10.1.1.2:8086', 'InfluxDB is a open source time series database for managing your home network.', 'si:influxdb'),
    ('Telegraf', 'http://10.1.1.2:8090', 'Telegraf is a open source plugin for managing your home network.', 'si:telegraf'),
    ('Prometheus', 'http://10.1.1.2:9090', 'Prometheus is a open source monitoring and analytics platform for managing your home network.', 'si:prometheus'),
    ('Alertmanager', 'http://10.1.1.2:9093', 'Alertmanager is a open source alerting platform for managing your home network.', 'si:alertmanager'),
    ('Pushover', 'http://10.1.1.2:5269', 'Pushover is a open source push notification platform for managing your home network.', 'si:pushover'),
    ('Pushbullet', 'http://10.1.1.2:8080', 'Pushbullet is a open source push notification platform for managing your home network.', 'si:pushbullet'),
    ('Pushover', 'http://10.1.1.2:5269', 'Pushover is a open source push notification platform for managing your home network.', 'si:pushover');
    `
}

const main = async () => {
    await createTables();
    await addDummyData();
}

main();