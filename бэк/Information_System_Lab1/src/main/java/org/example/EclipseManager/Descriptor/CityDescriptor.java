package org.example.EclipseManager.Descriptor;
import org.eclipse.persistence.descriptors.RelationalDescriptor;
import org.eclipse.persistence.mappings.DirectToFieldMapping;
import org.eclipse.persistence.mappings.OneToOneMapping;
import org.eclipse.persistence.mappings.converters.EnumTypeConverter;
import org.example.EclipseManager.ZonedDateTimeConverter;
import org.example.Entity.City;
import org.example.Entity.Coordinates;
import org.example.Entity.Human;
import org.example.Entity.Climate;

public class CityDescriptor {

     public static RelationalDescriptor buildCityDescriptor() {
         RelationalDescriptor cityDescriptor = new RelationalDescriptor();
         cityDescriptor.setJavaClass(City.class); // указывает класс описания
         cityDescriptor.setTableName("CITIES"); // задает основную таблицу name
         cityDescriptor.addPrimaryKeyFieldName("CITIES.ID");
         DirectToFieldMapping id = new DirectToFieldMapping();
         id.setAttributeName("id");
         id.setFieldName("CITIES.ID");
         cityDescriptor.addMapping(id);
         cityDescriptor.setSequenceNumberFieldName("CITIES.ID");
         cityDescriptor.setSequenceNumberName("cities_id_seq");

         DirectToFieldMapping name = new DirectToFieldMapping();
         name.setAttributeName("name");
         name.setFieldName("CITIES.NAME");
         cityDescriptor.addMapping(name);

         OneToOneMapping coordinatesMapping = new OneToOneMapping();
         coordinatesMapping.setAttributeName("coordinates");
         coordinatesMapping.setReferenceClass(Coordinates.class);
         coordinatesMapping.addForeignKeyFieldName("CITIES.COORDINATES_ID", "COORDINATES.ID");
         coordinatesMapping.setUsesIndirection(false);
         coordinatesMapping.setCascadeRemove(true);
         cityDescriptor.addMapping(coordinatesMapping);


         DirectToFieldMapping creationDate = new DirectToFieldMapping();
         creationDate.setAttributeName("creationDate");
         creationDate.setFieldName("CITIES.CREATION_DATE");
         creationDate.setConverter(new ZonedDateTimeConverter());
         cityDescriptor.addMapping(creationDate);

         DirectToFieldMapping area =  new DirectToFieldMapping();
         area.setAttributeName("area");
         area.setFieldName("CITIES.AREA");
         cityDescriptor.addMapping(area);

         DirectToFieldMapping population = new DirectToFieldMapping();
         population.setAttributeName("population");
         population.setFieldName("CITIES.POPULATION");
         cityDescriptor.addMapping(population);

         DirectToFieldMapping establishmentDate = new DirectToFieldMapping();
         establishmentDate.setAttributeName("establishmentDate");
         establishmentDate.setFieldName("CITIES.ESTABLISHMENT_DATE");
         cityDescriptor.addMapping(establishmentDate);

         DirectToFieldMapping capital = new DirectToFieldMapping();
         capital.setAttributeName("capital");
         capital.setFieldName("CITIES.CAPITAL");
         cityDescriptor.addMapping(capital);

         DirectToFieldMapping metersAboveSeaLevel = new DirectToFieldMapping();
         metersAboveSeaLevel.setAttributeName("metersAboveSeaLevel");
         metersAboveSeaLevel.setFieldName("CITIES.METERS_ABOVE_SEA_LEVEL");
         cityDescriptor.addMapping(metersAboveSeaLevel);

         DirectToFieldMapping timezone = new DirectToFieldMapping();
         timezone.setAttributeName("timezone");
         timezone.setFieldName("CITIES.TIMEZONE");
         cityDescriptor.addMapping(timezone);

         DirectToFieldMapping agglomeration = new DirectToFieldMapping();
         agglomeration.setAttributeName("agglomeration");
         agglomeration.setFieldName("CITIES.AGGLOMERATION");
         cityDescriptor.addMapping(agglomeration);

         DirectToFieldMapping climate = new DirectToFieldMapping();
         climate.setAttributeName("climate");
         climate.setFieldName("CITIES.CLIMATE");
         EnumTypeConverter enumTypeConverter = new EnumTypeConverter(climate, Climate.class, false);
         climate.setConverter(enumTypeConverter);
         cityDescriptor.addMapping(climate);

         OneToOneMapping governorMapping = new OneToOneMapping();
         governorMapping.setAttributeName("governor");
         governorMapping.setReferenceClass(Human.class);
         governorMapping.addForeignKeyFieldName("CITIES.GOVERNOR_ID", "HUMAN.ID");
         governorMapping.setUsesIndirection(false);
         governorMapping.setCascadeRemove(true);
         cityDescriptor.addMapping(governorMapping);

         return cityDescriptor;
     }



}
