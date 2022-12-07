package org.sid.customerservice.repositories;

import org.sid.customerservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

//exposer ca ous forme d'une api rest full
@RepositoryRestResource
public interface CustomerRepository extends JpaRepository<Customer,Long> {
}
