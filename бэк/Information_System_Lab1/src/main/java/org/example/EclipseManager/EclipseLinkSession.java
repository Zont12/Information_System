package org.example.EclipseManager;

import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import jakarta.inject.Inject;
import org.eclipse.persistence.sessions.DatabaseSession;

@ApplicationScoped
public class EclipseLinkSession {

    @Inject
    EclipseLinkConnection connection;

    private DatabaseSession databaseSession;

    @PostConstruct
    public void init() {
        databaseSession = connection.createDatabaseSession();
        databaseSession.login();
    }

    @Produces
    public DatabaseSession getDatabaseSession() {
        return databaseSession;
    }
}
