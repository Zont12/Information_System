package org.example.Repository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.persistence.expressions.Expression;
import org.eclipse.persistence.expressions.ExpressionBuilder;
import org.eclipse.persistence.sessions.DatabaseSession;
import org.eclipse.persistence.sessions.UnitOfWork;
import org.example.Entity.Coordinates;

import java.util.List;

@ApplicationScoped
public class CoordinatesRepository {
    @Inject
    DatabaseSession databaseSession;

    public Coordinates save(Coordinates coordinates) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        Coordinates savedCoords = (Coordinates) unitOfWork.registerNewObject(coordinates);
        unitOfWork.commit();
        return savedCoords;
    }

    public List<Coordinates> findAll() {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        return (List<Coordinates>) unitOfWork.readAllObjects(Coordinates.class);
    }

    public Coordinates findById(Integer id) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        Expression expression = new ExpressionBuilder().get("id").equal(id);
        return (Coordinates) unitOfWork.readObject(Coordinates.class, expression);
    }
}
