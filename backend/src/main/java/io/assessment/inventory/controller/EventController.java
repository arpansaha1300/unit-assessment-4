// package io.assessment.inventory.controller;

// import org.springframework.http.MediaType;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

// import java.io.IOException;
// import java.time.LocalTime;
// import java.util.concurrent.Executors;
// import java.util.concurrent.ScheduledExecutorService;
// import java.util.concurrent.TimeUnit;

// @RestController
// @RequestMapping("/api/events")
// public class EventController {

//     private final ScheduledExecutorService executorService = Executors.newScheduledThreadPool(1);

//     @GetMapping(value = "/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//     public SseEmitter streamEvents() {
//         SseEmitter emitter = new SseEmitter();
        
//         executorService.scheduleAtFixedRate(() -> {
//             try {
//                 emitter.send(SseEmitter.event().name("update").data("Current time: " + LocalTime.now()));
//             } catch (IOException e) {
//                 emitter.completeWithError(e);
//             }
//         }, 0, 5, TimeUnit.SECONDS);
//         emitter.onCompletion(() -> System.out.println("Connection closed"));
//         emitter.onTimeout(() -> System.out.println("Connection timed out"));

//         return emitter;
//     }
// }