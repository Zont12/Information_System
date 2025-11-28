package org.example.EclipseManager.Descriptor;

import org.eclipse.persistence.descriptors.RelationalDescriptor;
import org.eclipse.persistence.mappings.DirectToFieldMapping;
import org.example.Entity.Coordinates;

public class CoordinatesDescriptor {
    public static RelationalDescriptor buildCoordinatesDescriptor() {
        RelationalDescriptor coordinates_descriptor = new RelationalDescriptor();
        coordinates_descriptor.setJavaClass(Coordinates.class);
        coordinates_descriptor.setTableName("COORDINATES");
        coordinates_descriptor.addPrimaryKeyFieldName("COORDINATES.ID");
        DirectToFieldMapping id = new DirectToFieldMapping();
        id.setAttributeName("id");
        id.setFieldName("COORDINATES.ID");
        coordinates_descriptor.addMapping(id);
        coordinates_descriptor.setSequenceNumberFieldName("COORDINATES.ID");
        coordinates_descriptor.setSequenceNumberName("coordinates_id_seq");

        DirectToFieldMapping x = new DirectToFieldMapping();
        x.setAttributeName("x");
        x.setFieldName("COORDINATES.X");
        coordinates_descriptor.addMapping(x);

        DirectToFieldMapping y = new DirectToFieldMapping();
        y.setAttributeName("y");
        y.setFieldName("COORDINATES.Y");
        coordinates_descriptor.addMapping(y);

        return coordinates_descriptor;
    }
}
