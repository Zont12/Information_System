package org.example.EclipseManager;

import org.eclipse.persistence.mappings.DatabaseMapping;
import org.eclipse.persistence.mappings.converters.Converter;
import org.eclipse.persistence.sessions.Session;

import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class ZonedDateTimeConverter implements Converter {

    @Override
    public Object convertObjectValueToDataValue(Object objectValue, Session session) {
        if (objectValue == null) return null;
        return Timestamp.valueOf(((ZonedDateTime)objectValue).toLocalDateTime());
    }

    @Override
    public Object convertDataValueToObjectValue(Object dataValue, Session session) {
        if (dataValue == null) return null;
        return ((Timestamp)dataValue).toLocalDateTime().atZone(ZoneId.systemDefault());
    }

    @Override
    public boolean isMutable() {
        return false;
    }

    @Override
    public void initialize(DatabaseMapping mapping, Session session) {}
}
