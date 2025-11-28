package org.example.EclipseManager.Descriptor;

import org.eclipse.persistence.descriptors.RelationalDescriptor;
import org.eclipse.persistence.mappings.DirectToFieldMapping;
import org.example.Entity.Human;

public class HumanDescriptor {

    public static RelationalDescriptor buildHumanDescriptor() {
        RelationalDescriptor human_descriptor = new RelationalDescriptor();
        human_descriptor.setJavaClass(Human.class);
        human_descriptor.setTableName("HUMAN");
        human_descriptor.addPrimaryKeyFieldName("HUMAN.ID");

        DirectToFieldMapping id = new DirectToFieldMapping();
        id.setAttributeName("id");
        id.setFieldName("HUMAN.ID");
        human_descriptor.addMapping(id);

        human_descriptor.setSequenceNumberFieldName("HUMAN.ID");
        human_descriptor.setSequenceNumberName("human_id_seq");

        DirectToFieldMapping height = new DirectToFieldMapping();
        height.setAttributeName("height");
        height.setFieldName("HUMAN.HEIGHT");
        human_descriptor.addMapping(height);

        return human_descriptor;
    }
}
