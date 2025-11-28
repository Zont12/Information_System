package org.example.Aplication;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

@ApplicationPath("/api") // или "/"
public class RestApplication extends Application { }
