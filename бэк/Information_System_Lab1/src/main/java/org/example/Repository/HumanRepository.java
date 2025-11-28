package org.example.Repository;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.persistence.expressions.Expression;
import org.eclipse.persistence.expressions.ExpressionBuilder;
import org.eclipse.persistence.sessions.DatabaseSession;
import org.eclipse.persistence.sessions.UnitOfWork;
import org.example.Entity.Human;

import java.util.List;

@ApplicationScoped
public class HumanRepository {
    @Inject
    DatabaseSession databaseSession;

    public Human save(Human human) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        Human saveHuman = (Human) unitOfWork.registerNewObject(human);
        unitOfWork.commit();
        return saveHuman;
    }

    public List<Human> findAll() {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        return (List<Human>) unitOfWork.readAllObjects(Human.class);
    }

    public Human findById(Integer id) {
        UnitOfWork unitOfWork = databaseSession.acquireUnitOfWork();
        Expression expression = new ExpressionBuilder().get("id").equal(id);
        return (Human) unitOfWork.readObject(Human.class, expression);
    }
}
