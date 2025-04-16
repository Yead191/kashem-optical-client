import { CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FiMessageCircle } from "react-icons/fi";

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 bg-white/80 text-blue-600 border border-blue-100/50 shadow-sm backdrop-blur-md`}
        >
          <FiMessageCircle className="mr-2" />
          <span>To know more</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          About Kashem Optical
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your trusted partner for quality eyewear and exceptional eye care
          since 1995.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Founded in 1995 by Dr. Kashem Rahman, Kashem Optical began as a
              small family-owned optical shop in Chandpur, Bangladesh. With a
              passion for helping people see better and a commitment to quality,
              Dr. Rahman built a reputation for excellence in eyecare.
            </p>
            <p>
              Over the years, we've grown from a single store to multiple
              locations across the region, but our core values remain the same:
              providing personalized service, quality products, and expert care
              to every customer who walks through our doors.
            </p>
            <p>
              Today, Kashem Optical continues to be family-owned and operated,
              with the second generation of the Rahman family carrying forward
              Dr. Kashem's legacy of excellence and care.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <img
            src="https://placehold.co/600x400"
            alt="Kashem Optical store"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        <div>
          <h2 class="text-[#111518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
            Our Journey
          </h2>
          <div class="grid grid-cols-[40px_1fr] gap-x-2 px-4">
            <div class="flex flex-col items-center gap-1 pt-3">
              <div
                class="text-[#111518]"
                data-icon="Storefront"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Zm50,56h48v8a24,24,0,0,1-48,0Zm-16,0v8a24,24,0,0,1-48,0v-8ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm-8-72a24,24,0,0,1-24-24v-8h48v8A24,24,0,0,1,192,136Z"></path>
                </svg>
              </div>
              <div class="w-[1.5px] bg-[#dbe1e6] h-2 grow"></div>
            </div>
            <div class="flex flex-1 flex-col py-3">
              <p class="text-[#111518] text-base font-medium leading-normal">
                1985: Founding of Kashem Optical
              </p>
              <p class="text-[#60778a] text-base font-normal leading-normal">
                Started with a single store
              </p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="w-[1.5px] bg-[#dbe1e6] h-2"></div>
              <div
                class="text-[#111518]"
                data-icon="Storefront"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,96a7.89,7.89,0,0,0-.3-2.2L217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.8A7.89,7.89,0,0,0,24,96v16a40,40,0,0,0,16,32v64a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V144a40,40,0,0,0,16-32ZM54,48H202l11.42,40H42.61Zm50,56h48v8a24,24,0,0,1-48,0Zm-16,0v8a24,24,0,0,1-48,0v-8ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm-8-72a24,24,0,0,1-24-24v-8h48v8A24,24,0,0,1,192,136Z"></path>
                </svg>
              </div>
              <div class="w-[1.5px] bg-[#dbe1e6] h-2 grow"></div>
            </div>
            <div class="flex flex-1 flex-col py-3">
              <p class="text-[#111518] text-base font-medium leading-normal">
                1995: Expansion to five retail locations
              </p>
              <p class="text-[#60778a] text-base font-normal leading-normal">
                Expanded across the city
              </p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="w-[1.5px] bg-[#dbe1e6] h-2"></div>
              <div
                class="text-[#111518]"
                data-icon="GlobeHemisphereWest"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm88,104a87.62,87.62,0,0,1-6.4,32.94l-44.7-27.49a15.92,15.92,0,0,0-6.24-2.23l-22.82-3.08a16.11,16.11,0,0,0-16,7.86h-8.72l-3.8-7.86a15.91,15.91,0,0,0-11-8.67l-8-1.73L96.14,104h16.71a16.06,16.06,0,0,0,7.73-2l12.25-6.76a16.62,16.62,0,0,0,3-2.14l26.91-24.34A15.93,15.93,0,0,0,166,49.1l-.36-.65A88.11,88.11,0,0,1,216,128ZM143.31,41.34,152,56.9,125.09,81.24,112.85,88H96.14a16,16,0,0,0-13.88,8l-8.73,15.23L63.38,84.19,74.32,58.32a87.87,87.87,0,0,1,69-17ZM40,128a87.53,87.53,0,0,1,8.54-37.8l11.34,30.27a16,16,0,0,0,11.62,10l21.43,4.61L96.74,143a16.09,16.09,0,0,0,14.4,9h1.48l-7.23,16.23a16,16,0,0,0,2.86,17.37l.14.14L128,205.94l-1.94,10A88.11,88.11,0,0,1,40,128Zm102.58,86.78,1.13-5.81a16.09,16.09,0,0,0-4-13.9,1.85,1.85,0,0,1-.14-.14L120,174.74,133.7,144l22.82,3.08,45.72,28.12A88.18,88.18,0,0,1,142.58,214.78Z"></path>
                </svg>
              </div>
              <div class="w-[1.5px] bg-[#dbe1e6] h-2 grow"></div>
            </div>
            <div class="flex flex-1 flex-col py-3">
              <p class="text-[#111518] text-base font-medium leading-normal">
                2005: Launch of online store
              </p>
              <p class="text-[#60778a] text-base font-normal leading-normal">
                Serving customers nationwide
              </p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <div class="w-[1.5px] bg-[#dbe1e6] h-2"></div>
              <div
                class="text-[#111518]"
                data-icon="Eyeglasses"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M200,40a8,8,0,0,0,0,16,16,16,0,0,1,16,16v58.08A44,44,0,0,0,145.68,152H110.32A44,44,0,0,0,40,130.08V72A16,16,0,0,1,56,56a8,8,0,0,0,0-16A32,32,0,0,0,24,72v92a44,44,0,0,0,87.81,4h32.38A44,44,0,0,0,232,164V72A32,32,0,0,0,200,40ZM68,192a28,28,0,1,1,28-28A28,28,0,0,1,68,192Zm120,0a28,28,0,1,1,28-28A28,28,0,0,1,188,192Z"></path>
                </svg>
              </div>
              <div class="w-[1.5px] bg-[#dbe1e6] h-2 grow"></div>
            </div>
            <div class="flex flex-1 flex-col py-3">
              <p class="text-[#111518] text-base font-medium leading-normal">
                2015: Introduction of BlueProtect lenses
              </p>
              <p class="text-[#60778a] text-base font-normal leading-normal">
                Featuring enhanced blue light protection
              </p>
            </div>
            <div class="flex flex-col items-center gap-1 pb-3">
              <div class="w-[1.5px] bg-[#dbe1e6] h-2"></div>
              <div
                class="text-[#111518]"
                data-icon="Trophy"
                data-size="24px"
                data-weight="regular"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-28.49,64.64-63.51,64.9H128a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"></path>
                </svg>
              </div>
            </div>
            <div class="flex flex-1 flex-col py-3">
              <p class="text-[#111518] text-base font-medium leading-normal">
                2023: Recognition as a leading eyewear brand
              </p>
              <p class="text-[#60778a] text-base font-normal leading-normal">
                Awarded for quality and innovation
              </p>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To enhance the quality of life for our customers by providing
                exceptional eye care services and premium eyewear products that
                improve vision and protect eye health, all delivered with
                personalized attention and care.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the most trusted name in eye care across Bangladesh, known
                for our commitment to innovation, quality, and customer
                satisfaction, while making premium eye care accessible to all.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Kashem Optical
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Quality Products",
              description:
                "We offer only the highest quality frames, lenses, and contact lenses from trusted brands.",
            },
            {
              title: "Expert Staff",
              description:
                "Our team of certified optometrists and eyewear specialists provide expert advice and care.",
            },
            {
              title: "Affordable Prices",
              description:
                "We believe quality eye care should be accessible to everyone, with options for every budget.",
            },
            {
              title: "After-Sales Service",
              description:
                "We provide ongoing support, adjustments, and repairs to ensure your eyewear serves you well.",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      {/* <div>
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Kashem Optical provided me with the best eye care experience
                  I've ever had. The staff was knowledgeable and helped me find
                  the perfect frames for my face shape and prescription."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-semibold text-primary">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">Customer {i}</p>
                    <p className="text-sm text-muted-foreground">Chandpur</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default AboutPage;
