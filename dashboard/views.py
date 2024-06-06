# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .serializers import SensorDataSerializer

from django.shortcuts import render

# class SensorDataView(APIView):
#     def post(self, request):
#         serializer = SensorDataSerializer(data=request.data)
#         if serializer.is_valid():
#             # Save data to your database or process it
#             # Example: SensorData.objects.create(**serializer.validated_data)
#             return Response({"message": "Data received"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    if request.method == 'GET':
        return render(request, "dashboard/dashboard.html")
