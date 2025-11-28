package org.example.EclipseManager;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.persistence.platform.database.PostgreSQLPlatform;
import org.eclipse.persistence.sequencing.NativeSequence;
import org.eclipse.persistence.sessions.DatabaseLogin;
import org.eclipse.persistence.sessions.JNDIConnector;
import org.eclipse.persistence.sessions.Project;
import org.example.EclipseManager.Descriptor.CityDescriptor;
import org.example.EclipseManager.Descriptor.CoordinatesDescriptor;
import org.example.EclipseManager.Descriptor.HumanDescriptor;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

@ApplicationScoped
public class EclipseLinkConnection extends Project {
    public EclipseLinkConnection() {
        this.addDescriptor(CityDescriptor.buildCityDescriptor());
        this.addDescriptor(CoordinatesDescriptor.buildCoordinatesDescriptor());
        this.addDescriptor(HumanDescriptor.buildHumanDescriptor());
        try {
            Context search = new InitialContext(); // поиск по именам
            DataSource dataSource = (DataSource) search.lookup("java:/jdbc/DatabaseSql"); // находим соединение
            DatabaseLogin databaseLogin = new DatabaseLogin();
            JNDIConnector connector = new JNDIConnector(dataSource); // подключает
            databaseLogin.setConnector(connector);
            databaseLogin.setPlatform(new PostgreSQLPlatform());
            databaseLogin.addSequence(new NativeSequence("cities_id_seq"));
            databaseLogin.addSequence(new NativeSequence("coordinates_id_seq"));
            databaseLogin.addSequence(new NativeSequence("human_id_seq"));
            setDatasourceLogin(databaseLogin);
        }catch (NamingException e) {
            throw new RuntimeException("Ошибка подключения к DataSource через JNDI", e);
        }
    }
}
